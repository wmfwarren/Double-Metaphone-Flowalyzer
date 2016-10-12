"use strict";

const { assert } = require("chai");
const cleaner = require("../server/lib/punctuationCleaner.js");

describe("Splitter to split on spaces", () => {
  it("should be a function", () => {
    assert.isFunction(cleaner);
  });
  it("should make this string empty", () => {
    let expected = '';
    assert.equal(cleaner(".,\/#!$%\^&\*;\'\":{}=\_`~()"), expected);
  });
  it("should make the string follow-up into 'follow up'", () => {
    let expected = 'follow up';
    assert.equal(cleaner("follow-up"), expected);
  });
  it("should make this string into a space", () => {
    let expected = ' ';
    assert.equal(cleaner("-"), expected);
  });
});
