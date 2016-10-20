"use strict";

const cleanerDriver = require("./textCleanDriver.js");
const flatten = require("./flatten.js");

const [,,...cliArgs] = process.argv;
const argc = cliArgs.length;
const fullFlow = [];

for(let i = 0; i < argc; i++) {
	let cleanedWord = cleanerDriver(cliArgs[i]);
	console.log(`Word ${i}`, cleanedWord );
	fullFlow.push(cleanedWord);
}	



console.log("flow", flatten(fullFlow) );
