"use strict";

//step 1

module.exports = (stringToClean) => {
  stringToClean = stringToClean.replace(/[.,\/#!$%\^&\*;\'\":{}=\_`~()]/g, "");
  return stringToClean.replace(/-/g, ' ');
}
