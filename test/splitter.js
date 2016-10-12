"use strict";

const { assert } = require("chai");
const splitter = require("../server/lib/splitter.js");

describe("Splitter to split on spaces", () => {
  it("should be a function", () => {
    assert.isFunction(splitter);
  });
  it("should split a string on spaces", () => {
    let expected = ["This", "is", "just", "a", "test"];
    assert.deepEqual(splitter("This is just a test"), expected );
  });
});
