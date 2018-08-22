const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";



function getMatchesPerYear(dbName){
	return new Promise(function(resolve, reject){
		MongoClient.connect(url,{useNewUrlParser: true}, function(err, db){
			if(err){
				console.log(err.message);
			}
			let dbo = db.db(dbName);
	        let collection = dbo.collection("matches");
	        let group = {
		        	$group: {
		        		_id:      '$season',
		        		matches:  {$sum: 1}
		        	}
	        };
	        let project = {
		        	$project: {
		        		_id:       0,
		        		season:    "$_id",
		        		matches:   1
		        	}
	        }
			collection.aggregate([
				group, project
			]).toArray(function(err, data){
				if(err){
					console.log(err.message);
				}
				data.sort(function(a, b){
				    return a.season-b.season;
				})

	            let obj = {};
	            obj.matchesArray = data.map(obj=>obj.matches);
	            obj.seasonsArray = data.map(obj=>obj.season);
	            resolve(obj);
	        })
		})
	})
}



module.exports = {
	getMatchesPerYear: getMatchesPerYear
}
