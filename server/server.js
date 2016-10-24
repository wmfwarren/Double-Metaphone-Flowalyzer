"use strict";

const config = require("../database/knexfile.js").development;
const knex = require("knex")(config);

const express = require("express");
const bodyParser = require("body-parser");

const encoderDMP = require("../lib/analysis/DMPencoder.js");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("client"));
app.use(bodyParser.json());

app.set("port", port);

app.post("/api/newFlow", (req, res) => {
	const flow = req.body.flow;
	const artist = req.body.artist;
	const album = {title: req.body.album};
	const track = {title: req.body.track};

	//insert artist name into artist table
	knex("Artist")
		.insert({name: artist})
		.then((data) => {
			res.json(data);
		})
	//insert album info
	knex("Album")
		.insert({title: album.title})
		.then((data) => {
			res.json(data);
		})
	//insert album info
	knex("Track")
		.insert({title: track.title})
		.then((data) => {
			res.json(data);
		})
	//insert raw flow into flow table
	knex("Raw")
		.insert(req.body)
		.then((data) => {
			res.json(data);
		})

	// const encodedObj = {flow:	encoderDMP(flow)};

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
