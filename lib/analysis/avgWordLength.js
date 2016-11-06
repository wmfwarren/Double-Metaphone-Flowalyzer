"use strict";

const math = require("mathjs");

module.exports = (flow) => {
	const countedWords = [];
	const lines = flow.split('\n').forEach((line) => {
		line.split(' ');
	});
	// const numOfLines = lines.length;

	console.log("lines", lines);

	flow.replace(/\n/g, ' ').split(' ').forEach((word) => {
		if(0 < word.length) {
			countedWords.push(word.length);
		}
	});

	return {
						mean: math.mean(countedWords),
						stdev: math.std(countedWords),
						rsd: (math.std(countedWords) / math.mean(countedWords)) * 100,
						median: math.median(countedWords),
						mode: math.mode(countedWords)[0]
					};
}
