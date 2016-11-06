"use strict";

const math = require("mathjs");

module.exports = (flow) => {
	const countedWords = [];
	const splitLines = flow.split('\n');
	const lineLengthsArray = [];
	const totalLines = [];
	let wordCount = 0;

	//clean empty strings from split
	splitLines.forEach(line => {
		let lineToClean = line.split(' ');
		let cleanLine = [];

		lineToClean.forEach(word => {
			if(word !== ''){
				cleanLine.push(word);
				wordCount++;
			}
		})

		if(0 < cleanLine.length){
			lineLengthsArray.push(cleanLine.length);
		}
	});
	console.log("lineLengthsArray", lineLengthsArray);

	//get total number of lines after cleaning possible empty strings caused by splits
	splitLines.forEach(line => {
		if(line !== ''){
			totalLines.push(line);
		}
	});

	flow.replace(/\n/g, ' ').split(' ').forEach((word) => {
		if(0 < word.length && word !== '') {
			countedWords.push(word.length);
		}
	});

	return {
						length: wordCount,
						mean: math.mean(countedWords),
						stdev: math.std(countedWords),
						rsd: (math.std(countedWords) / math.mean(countedWords)) * 100,
						median: math.median(countedWords),
						mode: math.mode(countedWords)[0],
						lines: totalLines.length,
						lineMean: math.mean(lineLengthsArray),
						lineMedian: math.median(lineLengthsArray),
						lineMode: math.mode(lineLengthsArray)[0],
						lineStdev: math.std(lineLengthsArray)
					};
}
