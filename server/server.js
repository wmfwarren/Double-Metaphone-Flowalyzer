"use strict";

//MODULES
//DB
const config = require("../database/knexfile.js").development;
const knex = require("knex")(config);

//Third party packages
const express = require("express");
const bodyParser = require("body-parser");

//My packages
const encoderDMP = require("../lib/analysis/DMPencoder.js");
const { getArtistId, getAlbumId, getTrackId, getFlowId } = require("./getFKeys.js");
const wordStats = require("../lib/analysis/avgWordLength.js");

// CONSTANT
const port = process.env.PORT || 3000;

//INVOCATIONS
const app = express();

//MIDDLEWARE
app.use(express.static("client"));
app.use(bodyParser.json());

app.set("port", port);

//ROUTES
////Post new artist
app.post("/api/newArtist", (req, res) => {

	const artist = req.body.artist;

	knex("Artist")
		.insert({name: artist})
		.then((data) => {
			res.json(data);
		})
});
////post new album
app.post("/api/newAlbum", (req, res) => {
	
	const album = {title: req.body.album};
	const artist = req.body.artist;

	getArtistId(artist)
		.then((data) => {
			return data[0].id; //data[0].id is artist table PK
		})
		.then((data) => {
			knex("Album")
				.insert({title: album.title, artist_id: data})
				.then((data) => {
					res.json(data);
				})
		});
});
////post new track
app.post("/api/newTrack", (req, res) => {
	const track = {title: req.body.track};
	const album = req.body.album;

	getAlbumId(album)
	.then((data) => {
		return data[0].id; //this is the album id
	})
	.then((data) => {
		knex("Track")
			.insert({title: track.title, album_id: data})
			.then((data) => {
				res.json(data);
			})
	});
});
///// post new flow
app.post("/api/newFlow", (req, res) => {
	const flow = req.body.flow;
	const length = flow.replace(/\n/g, ' ').split(' ').length;

	const rapper = req.body.rapper;
	const track = req.body.track;

	const stats = wordStats(flow);
	console.log("stats", stats);
	//insert raw flow into flow table
	knex("Raw")
		.insert({
							flow: flow, 
							length: length, 
							unique_words: require("../lib/analysis/uniqueWords.js")(flow),
							average_word_length: stats.mean,
							word_length_stdev: stats.stdev,
							word_percent_rsd: stats.rsd,
							mode_word_length: stats.mode,
							median_word_length: stats.median,
							number_of_lines: stats.lines,
							mean_words_by_line: stats.wordsByLine
						})
		.then((data) => {
			res.json(data);
		});

	//insert DMP flow into DMP table
	knex("DMP")
		.insert({flow:	encoderDMP(flow)})
		.then((data) => {
			//this gets all the IDs for the join tab;e after inserting the DMP flow
			Promise.all([getFlowId(flow), getArtistId(rapper), getTrackId(track)])
				.then((IDs) => {
					return {
						flowId: IDs[0][0].id,
						rapperId: IDs[1][0].id,
						trackId: IDs[2][0].id
					};
				})
				//create the join "Flow" table here
				.then((data) => {
					knex("Flow")
						.insert({	rapper_id: data.rapperId,
											track_id: data.trackId,
											raw_flow_id: data.flowId,
											dmp_flow_id: data.flowId
						})
						.then((data) => {
						});
				});
		});
});

app.post("/api/searchArtistFlows", (req, res) => {
	const artistName = req.body.searchTerm;

	knex("Artist")
		.distinct("Artist.id", "Artist.name", "Track.title", "Album.title as album")
		.select()
		.innerJoin("Flow", "Artist.id", "Flow.rapper_id")
		.innerJoin("Track", "Flow.track_id", "Track.id")
		.innerJoin("Album", "Track.album_id", "Album.id")
		.where("Artist.name", artistName)
		.then((data) => {
			res.json(data);
		});
});

app.post("/api/searchTrackFlows", (req, res) => {
	const trackName = req.body.searchTerm;

	knex("Track")
		.select("Track.title")
		.select("Raw.flow as raw", "DMP.flow as dmp")
		.select("Raw.length as l", "Raw.unique_words as u", "Raw.average_word_length as avg", "Raw.word_length_stdev as stdev", "Raw.word_percent_rsd as rsd")
		.innerJoin("Flow", "Track.id", "Flow.track_id")
		.innerJoin("Raw", "Flow.raw_flow_id", "Raw.id")
		.innerJoin("DMP", "Raw.id", "DMP.id")
		.where("Track.title", trackName)
		.then((data) => {
			for(let i = 0; i < data.length; i++) {
				data[i].uniqueness = parseFloat(((data[i].u / data[i].l) * 100).toFixed(2));
			}
			res.json(data);
		});
});

//GETs

app.post("/api/findArtist", (req, res) => {
	const artistName = req.body.artist;

	knex("Artist")
		.where("name", artistName)
		.then((data) => {
			res.json(data);
		});
});

app.post("/api/findTrack", (req, res) => {
	const trackName = req.body.track;

	knex("Track")
		.where("title", trackName)
		.then((data) => {
			res.json(data);
		});
});

app.post("/api/findAlbum", (req, res) => {
	const albumName = req.body.album;

	knex("Album")
		.where("title", albumName)
		.then((data) => {
			res.json(data);
		});
});

app.get("/api/averageWordLengths", (req, res) => {
	knex("Artist")
		.max("id")
		.then((data) => {
			let promiseArray = [];
			let rows = data[0].max;
			//Create an array of promises, 1 for each rapper
			for(let i = 1; i <= rows; i++) {
				promiseArray.push( knex("Raw")
					.avg("average_word_length")
					.innerJoin("Flow", "Raw.id", "Flow.raw_flow_id")
					.where("rapper_id", i)
					.then((data) => {
						let length = data[0].avg;
						return length;
					})
				)
			}
			return promiseArray;
		})
		.then((promises) => {
			Promise.all(promises)
				.then((results) => {
					return results;
				})
				.then((lengthsArray) => {
					let length = lengthsArray.length
					const promiseArray = [];
					//make an array of promises to get the artists names back
					//they always come back in the same order as the uniquenesses
					for(let i = 1; i <= length; i ++){
						promiseArray.push(
							knex("Artist")
								.where("id", i)
								.select("name")
								.then((name) => {
									return name;
								})
							)
					}
					return {promiseArray, lengthsArray};
				})
				.then((data) => {
					Promise.all(data.promiseArray)
						.then((nameData) => {
							return {nameData, lengths: data.lengthsArray};
						})
						.then((arrays) => {
							const rapperLengthsArray = [];
							for(let i = 0; i < arrays.nameData.length; i++){
								let obj = {};
									
									obj.wordLengths = arrays.lengths[i];

									if(arrays.nameData[i].length > 0  ){
										obj.rapper = arrays.nameData[i][0].name;
									}
									

									if(obj.wordLengths !== null){
										rapperLengthsArray.push(obj);
									}
									
							}
							res.json(rapperLengthsArray);
						});
				});
		});

});

app.get("/api/averageLengths", (req, res) => {
		//this knex sql query gets the number of artists
	knex("Artist")
		.max("id")
		.then((data) => {
			let promiseArray = [];
			let rows = data[0].max;
			//Create an array of promises, 1 for each rapper
			for(let i = 1; i <= rows; i++) {
				promiseArray.push( knex("Raw")
					.avg("length")
					.innerJoin("Flow", "Raw.id", "Flow.raw_flow_id")
					.where("rapper_id", i)
					.then((data) => {
						let length = data[0].avg;

						return Math.round(length);
					})
				)
			}
			return promiseArray;
		})
		.then((promises) => {
			Promise.all(promises)
				.then((results) => {
					return results;
				})
				.then((lengthsArray) => {
					let length = lengthsArray.length
					const promiseArray = [];
					//make an array of promises to get the artists names back
					//they always come back in the same order as the uniquenesses
					for(let i = 1; i <= length; i ++){
						promiseArray.push(
							knex("Artist")
								.where("id", i)
								.select("name")
								.then((name) => {
									return name;
								})
							)
					}
					return {promiseArray, lengthsArray};
				})
				.then((data) => {
					Promise.all(data.promiseArray)
						.then((nameData) => {
							return {nameData, lengths: data.lengthsArray};
						})
						.then((arrays) => {
							const rapperLengthsArray = [];

							for(let i = 0; i < arrays.nameData.length; i++){
								let obj = {};

								obj.lengths = arrays.lengths[i];

								if( obj.lengths !== 0){
									obj.rapper = arrays.nameData[i][0].name;
									rapperLengthsArray.push(obj);
								}
							}
							res.json(rapperLengthsArray);
						});
				});
		});
});

app.get("/api/averageUniqueness", (req, res) => {

	//this knex sql query gets the number of artist
	knex("Artist")
		.max("id")
		.then((data) => {
			let averageFlowLengthArray = [];
			let promiseArray = [];
			let rows = data[0].max;
			//Create an array of promises, 1 for each rapper
			for(let i = 1; i <= rows; i++) {
				promiseArray.push( knex("Raw")
					.avg("length as l")
					.avg("unique_words as u")
					.innerJoin("Flow", "Raw.id", "Flow.raw_flow_id")
					.where("rapper_id", i)
					.then((data) => {
						let returnObj = data[0];

						return parseFloat(((returnObj.u / returnObj.l) * 100).toFixed(2));
					})
				)
			}
			return promiseArray;
		})
		//return out the array of promises
		.then((promises) => {
			Promise.all(promises) //promise all the array
				.then((results) => {
					return results;
				})
				.then((uniquenessArray) => {
					let length = uniquenessArray.length
					const promiseArray = [];
					//make an array of promises to get the artists names back
					//they always come back in the same order as the uniquenesses
					for(let i = 1; i <= length; i ++){
						promiseArray.push(
							knex("Artist")
								.where("id", i)
								.select("name")
								.then((name) => {
									return name;
								})
							)
					}
					return {promiseArray, uniquenessArray};
				})
				.then((data) => {
					Promise.all(data.promiseArray)
						.then((nameData) => {
							return {nameData, uniqueness: data.uniquenessArray};
						})
						.then((arrays) => {
							const rapperUniquenessArray = [];

							for(let i = 0; i < arrays.nameData.length; i++){
								let obj = {};

								obj.uniqueness = arrays.uniqueness[i];

								if(!isNaN(obj.uniqueness)){
									obj.rapper = arrays.nameData[i][0].name;
									rapperUniquenessArray.push(obj);
								}
							}
							res.json(rapperUniquenessArray);
						});
				});
		});
});



//LISTENING on port...
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
