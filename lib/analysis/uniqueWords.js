"use strict";

const cleaner = require("../punctuationCleaner.js");
const flatten = require("../flatten.js");

//This module counts the number of unique words in a single flow.

module.exports = (flow) => {
	const wordArray = [];
	const flowArray = flatten(cleaner(flow).toUpperCase().split(' '));

	flowArray.forEach((word) => {

		word = word.toUpperCase();

		if(wordArray.includes(word)){

		} else {
			wordArray.push(word);
		}
	})

	return wordArray.length;

}
