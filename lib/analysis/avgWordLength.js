"use strict";

const math = require("mathjs");

module.exports = (flow) => {
	const countedWords = [];
	const splitLines = flow.split('\n');
	const lineLengthsArray = [];

	splitLines.forEach(line => {
		lineLengthsArray.push(line.split(' ').length);
	});

	console.log("lineLengthsArray", lineLengthsArray);

	const totalLines = splitLines.length;

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
						lineMean: math.mean(lineLengthsArray),
						lineMedian: math.median(lineLengthsArray),
						lineMode: math.mode(lineLengthsArray)[0],
						lineStdev: math.std(lineLengthsArray)
					};
}
