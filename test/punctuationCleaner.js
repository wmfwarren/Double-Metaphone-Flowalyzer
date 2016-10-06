"use strict";

const { assert } = require("chai");
const cleaner = require("../server/lib/punctuationCleaner.js");

describe("Splitter to split on spaces", () => {
  it("should be a function", () => {
    assert.isFunction(cleaner);
  });
  it("should make this string empty", () => {
    let expected = "";
    assert.equal(cleaner(".,\/#!$%\^&\*;\'\":{}=\-_`~()"), "");
  });
});
