"use strict";

module.exports = (stringToClean) => {
  return  stringToClean.replace(/[.,\/#!$%\^&\*;\'\":{}=\-_`~()]/g, "");
}
