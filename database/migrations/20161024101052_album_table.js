"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Album', (table) => {
        table.increments("id"); //for the primary key UID 
        table.string('title');
        table.integer("artist_id").references("Artist.id");
    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('Album');
};
