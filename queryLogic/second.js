const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";



function matchesWonAllTeams(dbName){
    return new Promise(function(resolve, reject){
    	MongoClient.connect(url,{useNewUrlParser: true}, function(err, db){
			if(err){
				console.log(err.message);
			}
			let dbo = db.db(dbName);
	        let collection = dbo.collection("matches");


	        let match = {
	        	"$match": {"winner": {"$exists": true, "$ne": ""}}
	        }
	        let group = {
	        		"$group": {
				        "_id":	 {
				            "season": "$season",
				            "winner": "$winner"
						},
			        	"count":	{ "$sum": 1 }
					}
	        };
			let project = {
					"$project": {
						_id: 0,
						season: 	"$_id.season",
						team:		"$_id.winner",
						wins:		"$count"
					}
			};
			let sort = {
				"$sort": {season: 1}
			}
	        collection.aggregate([match, group, project, sort]).toArray(function(err, res){
	        	if(err){
	        		console.log(err);
	        	}
	        	let seasonsArray = [];
	        	res.map(function(obj){
	        		if(!seasonsArray.includes(obj.season)){
	        			seasonsArray.push(obj.season);
	        		}
	        	})
	        	let teamsArray = [];
	        	res.map(function(obj){
	        		if(!teamsArray.includes(obj.team)){
	        			teamsArray.push(obj.team);
	        		}
	        	})
	        	let obj = {};
	        	res.map(function(data, index){
	        		if(!obj[data.season]){
	        			obj[data.season] = {};
	        		}
	    			obj[data.season][data.team] = data.wins;
	        	})
	        	let finalArray = [];
	        	let combinedObj = {};
	    		teamsArray.map(function(el){
	        		let retObj = {};
	        		retObj["name"] = el;
	        		retObj["data"] = [];
	        		for(let i = 0 ; i<seasonsArray.length; i++){
	        			let key = seasonsArray[i];
	        			if(obj[key][el]){
	        				(retObj["data"]).push(obj[key][el])
	        			}else{
	        				(retObj["data"]).push(0);
	        			}
	        		}
	    			finalArray.push(retObj);
	    			combinedObj["seasons"] = seasonsArray;
	    			combinedObj["xaxisData"] = finalArray;

	    		});
	    		resolve(combinedObj);

		    })
    	})
    })
}

module.exports = {
    matchesWonAllTeams: matchesWonAllTeams
}
