"use strict";

const cleanerDriver = require("../textCleanDriver.js");
const flatten = require("../flatten.js");
const doubleMetaphone = require("../doubleMetaphone.js");

//This module runs the double metaphone algorithm variant that this project uses

module.exports = (flow) => {
	const fullDMPFlow = [];

	flow = cleanerDriver(flow);
	flow = flatten(flow);

	for(let i = 0; i < flow.length; i++) {
	let DMPWord = doubleMetaphone(flow[i]);
	fullDMPFlow.push(DMPWord);
	}

	return fullDMPFlow.join(' ');
}




