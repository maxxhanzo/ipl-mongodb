const expect = require("chai").expect;
const first = require("../queryLogic/first.js");
const second = require("../queryLogic/second.js");
const third = require("../queryLogic/third.js");
const fourth = require("../queryLogic/fourth.js");
const fifth = require("../queryLogic/fifth.js");


describe("first graph", function(){
	it("should exist", function(){
		expect(first.getMatchesPerYear).to.exist;
	});
	it("should return the no of matches per year", async function(){
		let expectedResult = {
								seasonsArray: [2008, 2010, 2014, 2015, 2016, 2017],
								matchesArray: [2,1,1,3,2,1]
							};
		let res = await first.getMatchesPerYear("test");
		expect(res).to.deep.equal(expectedResult);
	});

})
describe("second graph", function(){
	it("should exist", function(){
		expect(second.matchesWonAllTeams).to.exist;
	});
	it("should return the no of matches per year", async function(){
	let expectedResult = {
				seasons:  [ 2008, 2010, 2014, 2015, 2016, 2017 ],
			  	xaxisData:
					[
						{ name: 'Rising Pune Supergiant', data: [ 1, 0, 0, 0, 0, 0 ] },
						{ name: 'Kolkata Knight Riders', data: [ 1, 0, 0, 0, 0, 0 ] },
						{ name: 'Kings XI Punjab', data: [ 0, 1, 0, 1, 0, 0 ] },
						{ name: 'Royal Challengers Bangalore', data: [ 0, 0, 1, 0, 0, 0 ] },
						{ name: 'Mumbai Indians', data: [ 0, 0, 0, 1, 1, 0 ] },
						{ name: 'Sunrisers Hyderabad', data: [ 0, 0, 0, 1, 0, 1 ] },
						{ name: 'Delhi Daredevils', data: [ 0, 0, 0, 0, 1, 0 ] } ]
	}


		let res = await second.matchesWonAllTeams("test");
		expect(res).to.deep.equal(expectedResult);
	});

})

describe("third graph", function(){
	it("should exist", function(){
		expect(third.extraRunsPerTeam).to.exist;
	});
	it("should return the no of matches per year", async function(){
		let expectedResult = {
								teamsArray: ["Sunrisers Hyderabad", "Royal Challengers Bangalore"],
								extrasArray: [1, 5]
							};
		let res = await third.extraRunsPerTeam("test");
		expect(res).to.deep.equal(expectedResult);
	});

})

describe("fourth graph", function(){
	it("should exist", function(){
		expect(fourth.getEconomicalBowlers).to.exist;
	});
	it("should return the no of matches per year", async function(){
		let expectedResult = {
								nameArray: ["A Choudhary", "TS Mills"],
								ecoArray: [10, 15]
							};
		let res = await fourth.getEconomicalBowlers("test");
		expect(res).to.deep.equal(expectedResult);
	});

})

describe("fifth graph", function(){
	it("should exist", function(){
		expect(fifth.getTopBatsmen).to.exist;
	});
	it("should return the no of matches per year", async function(){
		let expectedResult = {
								batsmenArray: ["DA Warner", "S Dhawan"],
								runsArray: [11, 1]
							};
		let res = await fifth.getTopBatsmen("test");
		expect(res).to.deep.equal(expectedResult);
	});

})
