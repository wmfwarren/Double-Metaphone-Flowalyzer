"use strict";

const cleanerDriver = require("../textCleanDriver.js");
const flatten = require("../flatten.js");
const doubleMetaphone = require("../doubleMetaphone.js");
const punctuationCleaner = require("../punctuationCleaner.js");

//This module runs the double metaphone algorithm variant that this project uses

module.exports = (flow) => {
	let fullDMPFlow = [];


	flow = punctuationCleaner(flow).split(' ');
	console.log("flow", flow);



	for(let i = 0; i < flow.length; i++) {
	let word = flow[i];
	word = cleanerDriver(word);
	word = flatten(word);
	let DMPWord = doubleMetaphone(word[0]);
	fullDMPFlow.push(DMPWord);
	}

	fullDMPFlow = flatten(fullDMPFlow);

	return fullDMPFlow.join(' ');
}




