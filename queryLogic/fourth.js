const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";



function getEconomicalBowlers(dbName){
    return new Promise(function(resolve, reject){
    	MongoClient.connect(url,{useNewUrlParser: true}, function(err, db){
			if(err){
				console.log(err.message);
			}

			let dbo = db.db(dbName);
	        let collection = dbo.collection("matches");

            let match =  {"$match":{"season": 2015}};
	        let lookup = {
	                        $lookup: {
	                            from:			"deliveries",
	                            localField: 	"id",
	                            foreignField:	"match_id",
	                            as: 			"deliveriesDetails"
	                        }
	                    }
	        let unwind = {"$unwind":"$deliveriesDetails"};
	        let group =  {
                    "$group":{
                		"_id":  "$deliveriesDetails.bowler",
                		runs:   {$sum: "$deliveriesDetails.batsman_runs"},
                		balls:  {$sum: 1},
                		bye:    {$sum:"$deliveriesDetails.bye_runs"},
                        legbye: {$sum:"$deliveriesDetails.legbye_runs"},
                        wide:   {$sum:{
                        	$cond:  { if: { $gte: [ "$deliveriesDetails.wide_runs", 2 ] }, then: 1, else: 0 }
                        }},
                        no:{
                        	$sum:{
                            	$cond: { if: { $gte: [ "$deliveriesDetails.noball_runs", 2 ] }, then: 1, else: 0 }
                        	}
                        }
                    }
	        };
	        let project = {
	                    $project:{
	                        name: "$_id",
	                        _id: 0,
	                        eco: {$multiply: [{$divide:[{$add:[{$add:["$runs", "$wide"]}, "$no"]}, {$subtract:[{$subtract:["$balls", "$wide"]}, "$no"]}]}, 6]}
	                        }
	                    };
	        let sort =	{
	        	$sort:	{eco: 1}
	        };
	        let limit = {$limit: 10}

	        collection.aggregate([
	            match,lookup,unwind,group,project, sort, limit
	        ]).toArray(function(err, data){
	            if(err){
	            	console.log(err)
	            }
	            let obj = {};
	            obj.nameArray = data.map(obj=>obj.name);
	            obj.ecoArray = data.map(obj=>parseFloat(obj.eco.toFixed(2)));
	            resolve(obj);
	            // console.log(obj);
	        })
    	})
    })
}

module.exports = {
    getEconomicalBowlers: getEconomicalBowlers
}
