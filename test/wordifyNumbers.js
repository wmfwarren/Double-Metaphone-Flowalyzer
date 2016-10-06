"use strict";

const { assert } = require("chai");
const wordify = require("../server/lib/wordifyNumbers.js");

describe("Splitter to split on spaces", () => {
  it("should be a function", () => {
    assert.isFunction(wordify);
  });
  it("should return 'one' from 1", () => {
    let expected = "one";
    assert.equal(wordify(1), expected);
  });
  it("should return 'twenty-one' from 21", () => {
    let expected = "twenty-one";
    assert.equal(wordify(21), expected);
  });
  it("should return 'nineteen ninety five' from 1", () => {
    let expected = "nineteen";
    assert.equal(wordify(19), expected);
  });
  it("should return 'zero' from 0", () => {
    let expected = "zero";
    assert.equal(wordify(0), expected);
  });
});
