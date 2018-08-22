const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";



function extraRunsPerTeam(dbName){
    return new Promise(function(resolve, reject){
    	MongoClient.connect(url,{useNewUrlParser: true}, function(err, db){
			if(err){
				console.log(err.message);
			}
			let dbo = db.db(dbName);
	        let collection = dbo.collection("matches");

	        let match =  {"$match":  {"season": 2016}};
	        let lookup = {
				            $lookup: {
				                from:         "deliveries",
				                localField:   "id",
				                foreignField: "match_id",
				                as:           "deliveriesDetails"
				            }
	        };
			let unwind = {"$unwind":"$deliveriesDetails"};
			let group =  {
		            "$group":{
		            	"_id": "$deliveriesDetails.bowling_team",
		            	total:{
		            		$sum: "$deliveriesDetails.extra_runs"
		            	}
		            }
	        };
	        let project = {
		        	$project: {
		        		_id:       0,
		        		teams:    "$_id",
		        		total:   1
		        	}
		    }
	        collection.aggregate([
	        	match, lookup, unwind, group, project
	        	]).toArray(function(err, data){
		            if(err){
		            	console.log(err)

		            }
		            data.sort(function(a, b){
					    return a.total-b.total;
					})
					let obj = {};
		            obj.teamsArray = data.map(obj=>obj.teams);
		            obj.extrasArray = data.map(obj=>obj.total);
		            resolve(obj);
		            // console.log(obj);
	        	})
	    })
    })
}

module.exports = {
    extraRunsPerTeam: extraRunsPerTeam
}
