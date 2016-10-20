"use strict";

//step 1

module.exports = (stringToClean) => {
  stringToClean = stringToClean.replace(/[.,\/#!$%\^&\*;\'\":{}=\_`~()]/g, "");
  stringToClean = stringToClean.replace(/\n/g, ' ');
  return stringToClean.replace(/-/g, ' ');
}
