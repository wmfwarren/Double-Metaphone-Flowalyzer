"use strict";

module.exports = (array) => {
	return array.reduce((a, b) => {
		return a.concat(b);
	}, []);
}
