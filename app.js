const express   =       require("express");
const app       =       express();
const path      =       require("path");
const first     =       require("./queryLogic/first.js");
const second    =       require("./queryLogic/second.js");
const third     =       require("./queryLogic/third.js");
const fourth    =       require("./queryLogic/fourth.js");
const fifth     =       require("./queryLogic/fifth.js");

app.use(express.static("public"));
app.set("view engine", "ejs");



app.get("/", function(req, res){
    first.getMatchesPerYear("ipl").then(function(d){
        res.render("home", {data: JSON.stringify(d)})
    });
});

app.get("/first", function(req, res){
    first.getMatchesPerYear("ipl").then(function(d){
        res.render("first", {data: JSON.stringify(d)})
    });
});

app.get("/second", function(req, res){
    second.matchesWonAllTeams("ipl").then(function(d){
		res.render("second", {data: JSON.stringify(d)})
   });
});

app.get("/third", function(req, res){
    third.extraRunsPerTeam("ipl").then(function(d){
        res.render("third", {data: JSON.stringify(d)})
    });
});

app.get("/fourth", function(req, res){
    fourth.getEconomicalBowlers("ipl").then(function(d){
        res.render("fourth", {data: JSON.stringify(d)})
    });
});

app.get("/fifth", function(req, res){
    fifth.getTopBatsmen("ipl").then(function(d){
        res.render("fifth", {data: JSON.stringify(d)})
    });
});

app.listen(3000, function(){
    console.log("server has started");
});
