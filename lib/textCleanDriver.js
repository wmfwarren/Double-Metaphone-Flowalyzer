"use strict";

const punctuationCleaner = require("./punctuationCleaner.js");
const splitter = require("./splitter.js");
const wordify = require("./wordifyNumbers.js");

module.exports = (word) => {
	word = punctuationCleaner(word);
	word = wordify(word);
	word = splitter(word);
	return word;
}
