"use strict";

//this module flattens 2D arrays that can appear in the splitting and cleaning functions

module.exports = (array) => {
	return array.reduce((a, b) => {
		return a.concat(b);
	}, []);
}
