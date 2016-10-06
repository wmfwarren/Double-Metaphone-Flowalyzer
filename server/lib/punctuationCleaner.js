"use strict";

module.exports = (stringToClean) => {
  stringToClean = stringToClean.replace(/[.,\/#!$%\^&\*;\'\":{}=\_`~()]/g, "");
  return stringToClean.replace(/-/g, ' ');
}
