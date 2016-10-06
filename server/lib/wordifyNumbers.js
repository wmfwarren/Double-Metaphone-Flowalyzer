"use strict";

//For a year like 1995 to be spelled nineteen ninety-five
//it is neccesary to put a space in the middle of the four numerals

const wordify = require("number-to-words");

module.exports = (stringToWordify) => {
  if(typeof(parseInt(stringToWordify)) === "number") {
    return wordify.toWords(parseInt(stringToWordify));
  }
}
