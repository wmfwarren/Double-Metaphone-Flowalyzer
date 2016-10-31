"use strict";

const math = require("mathjs");

module.exports = (flow) => {
	const countedWords = [];

	flow.split(' ').forEach((word) => {
		if(0 < word.length) {
			countedWords.push(word.length);
		}
	});

	return {
						mean: math.mean(countedWords),
						stdev: math.std(countedWords),
						rsd: (math.std(countedWords) / math.mean(countedWords)) * 100
					};
}
