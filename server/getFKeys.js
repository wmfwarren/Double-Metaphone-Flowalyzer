"use strict";

const config = require("../database/knexfile.js").development;
const knex = require("knex")(config);


const getArtistId = (artistName) => {

	return new Promise ((resolve, reject) => {

		knex("Artist").where("name", artistName).select("id").then((data) => {
			if (data) {
				resolve(data);
			} else {
				reject();
			}
		});
	})
};

const getAlbumId = (albumName) => {

	return new Promise ((resolve, reject) => {

		knex("Album").where("title", albumName).select("id").then((data) => {
			if (data) {
				resolve(data);
			} else {
				reject();
			}
		});
	})
};

const getTrackId = (trackName) => {

	return new Promise ((resolve, reject) => {

		knex("Track").where("title", trackName).select("id").then((data) => {
			if (data) {
				resolve(data);
			} else {
				reject();
			}
		});
	})
};

module.exports = {getArtistId, getAlbumId, getTrackId};
