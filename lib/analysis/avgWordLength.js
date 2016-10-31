"use strict";

module.exports = (flow) => {
	let countedWords = 0;
	let totalLength = 0;

	flow.split(' ').forEach((word) => {
		if(1 < word.length) {
			countedWords++;
			totalLength += word.length;
		}
	});

	return totalLength / countedWords;
}
