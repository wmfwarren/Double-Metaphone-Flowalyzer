"use strict";

const cleaner = require("../punctuationCleaner.js");
const flatten = require("../flatten.js");

module.exports = (flow) => {
	const wordArray = [];
	const flowArray = flatten(cleaner(flow).split(' '));

	flowArray.forEach((word) => {
		if(wordArray.includes(word)){

		} else {
			wordArray.push(word);
		}
	})

	return wordArray.length;

}
