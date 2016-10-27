"use strict";

//This module cleans punctuations out of string and make \n int ' '

module.exports = (stringToClean) => {
  stringToClean = stringToClean.replace(/[.,\/#!$%\^&\*;\'\":{}=\_`~()]/g, "");
  stringToClean = stringToClean.replace(/\n/g, ' ');
  return stringToClean.replace(/-/g, ' ');
}
