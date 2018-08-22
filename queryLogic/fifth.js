const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";



function getTopBatsmen(dbName){
	return new Promise(function(resolve, reject){
		    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db){
			if(err){
				console.log(err.message);
			}
			let dbo = db.db(dbName);
	        let collection = dbo.collection("matches");

            let match = {"$match":{"season": 2014}};
            let lookup = {
                    $lookup: {
                        from: "deliveries",
                        localField: "id",
                        foreignField: "match_id",
                        as: "deliveriesDetails"
                    }
                }
            let unwind = {"$unwind":"$deliveriesDetails"};
             let group = {
                        "$group":{"_id": "$deliveriesDetails.batsman",
                         runs:{$sum: "$deliveriesDetails.batsman_runs"},
                        }
                    };
            let project = {
                        $project:{
                            name: "$_id",
                            _id: 0,
                            runs: 1
                            }
                        };
            let sort = {$sort:{runs: -1}};
            let limit = {$limit: 10};
            collection.aggregate([
                match, lookup, unwind, group, project, sort, limit
            ]).toArray(function(err, data){
                if(err){
                	console.log(err)
                }
                let obj = {};
	            obj.batsmenArray = data.map(obj=>obj.name);
	            obj.runsArray = data.map(obj=>obj.runs);
	            resolve(obj);
            })

    	})
	})
}

module.exports = {
    getTopBatsmen: getTopBatsmen
}
