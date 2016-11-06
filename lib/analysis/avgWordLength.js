"use strict";

const math = require("mathjs");

module.exports = (flow) => {
	const countedWords = [];
	const splitLines = flow.split('\n');

	// console.log("lines", splitLines);

	const totalLines = splitLines.length;

	// console.log("totalLines", totalLines);

	const meanWordsByLine = flow.replace(/\n/g, ' ').split(' ').length / totalLines;

	// console.log("meanWordsByLine", meanWordsByLine);

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
						mode: math.mode(countedWords)[0],
						lines: totalLines,
						wordsByLine: meanWordsByLine
					};
}
