"use strict";

const config = require("../database/knexfile.js").development;
const knex = require("knex")(config);

const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000
const app = express()

app.use(express.static("client"))
app.use(bodyParser.json())

app.set("port", port)



app.listen(port, () => {
	console.log(`Listening on port ${port}`);
})
