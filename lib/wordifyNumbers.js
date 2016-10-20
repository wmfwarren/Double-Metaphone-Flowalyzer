"use strict";

//step 3

//For a year like 1995 to be spelled nineteen ninety-five
//it is neccesary to put a space in the middle of the four numerals

const wordify = require("number-to-words");

module.exports = (stringToWordify) => {
	const numString = parseInt(stringToWordify);

  if (!isNaN(numString)) {
  	const wordArray =  wordify.toWords(numString);
  	return wordArray.replace(/-/, ' ');
  }

  return stringToWordify;
}
