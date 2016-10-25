"use strict";

const config = require("../database/knexfile.js").development;
const knex = require("knex")(config);

const { getArtistId, getAlbumId } = require("./getFKeys.js");

const express = require("express");
const bodyParser = require("body-parser");

const encoderDMP = require("../lib/analysis/DMPencoder.js");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("client"));
app.use(bodyParser.json());

app.set("port", port);

//ROUTES

app.post("/api/newArtist", (req, res) => {

	const artist = req.body.artist;

	knex("Artist")
		.insert({name: artist})
		.then((data) => {
			res.json(data);
		})
});

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

app.post("/api/newTrack", (req, res) => {
	const track = {title: req.body.track};
	const album = req.body.album;

	getAlbumId(album)
	.then((data) => {
		console.log("track data", data );
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

app.post("/api/newFlow", (req, res) => {
	const flow = req.body.flow;

	//insert raw flow into flow table
	knex("Raw")
		.insert(req.body)
		.then((data) => {
			res.json(data);
		})

	//insert DMP flow into DMP table
	knex("DMP")
		.insert({flow:	encoderDMP(flow)})
		.then((data) => {
			res.json(data);
		})
		
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
