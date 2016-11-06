"use strict";

const cleaner = require("../punctuationCleaner.js");
const flatten = require("../flatten.js");

//This module counts the number of unique words in a single flow.

module.exports = (flow) => {
	const wordArray = [];
	const flowArray = flatten(cleaner(flow).toUpperCase().replace(/\n/g,' ').split(' '));

	flowArray.forEach((word) => {

		word = word.toUpperCase();

		if(wordArray.includes(word) || word === ''){

		} else {
			wordArray.push(word);
		}
	})

	console.log("wordArray", wordArray);

	return wordArray.length;

}
