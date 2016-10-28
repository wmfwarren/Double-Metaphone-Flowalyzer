"use strict";

//MODULES
//DB
const config = require("../database/knexfile.js").development;
const knex = require("knex")(config);

const { getArtistId, getAlbumId, getTrackId, getFlowId } = require("./getFKeys.js");

const express = require("express");
const bodyParser = require("body-parser");

const encoderDMP = require("../lib/analysis/DMPencoder.js");

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
	const length = flow.split(' ').length;

	const rapper = req.body.rapper;
	const track = req.body.track;

	//insert raw flow into flow table
	knex("Raw")
		.insert({flow: flow, length: length, unique_words: require("../lib/analysis/uniqueWords.js")(flow)})
		.then((data) => {
			res.json(data);
		})

	//insert DMP flow into DMP table
	knex("DMP")
		.insert({flow:	encoderDMP(flow)})
		.then((data) => {
			//this gets all the IDs for the join tab;e after inserting the DMP flow
			Promise.all([getFlowId(flow), getArtistId(rapper), getTrackId(track)])
				.then((IDs) => {
					console.log("Promise All Return", IDs);
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
							console.log("data", data);
						});
				});
		});
});

//GET Methods

//LISTENING on port...
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
