"use strict";

const splitter = require("./splitter.js");
const wordify = require("./wordifyNumbers.js");

module.exports = (word) => {
	
	word = wordify(word);
	word = splitter(word);
	return word;
}
