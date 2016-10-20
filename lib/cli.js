"use strict";

//NOTE: This is a testing file

const cleanerDriver = require("./textCleanDriver.js");
const flatten = require("./flatten.js");
const doubleMetaphone = require("./doubleMetaphone.js");

const [,,...cliArgs] = process.argv;
const argc = cliArgs.length;
let fullFlow = [];
const fullDMPFlow = [];

for(let i = 0; i < argc; i++) {
	let cleanedWord = cleanerDriver(cliArgs[i]);
	// console.log(`Word ${i}`, cleanedWord );
	fullFlow.push(cleanedWord);
}	

fullFlow = flatten(fullFlow);

for(let i = 0; i < fullFlow.length; i++) {
	let DMPWord = doubleMetaphone(fullFlow[i]);
	fullDMPFlow.push(DMPWord);
}

console.log("DMP Flow", fullDMPFlow);
