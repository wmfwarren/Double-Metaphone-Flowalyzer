"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Track', (table) => {
        table.increments("id"); //for the primary key UID 
        table.string('title');
        table.integer("album_id").references("Album.id");
    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('Track');
};
