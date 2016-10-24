"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('DMP', (table) => {
        table.increments("id"); //for the primary key UID 
        table.string('flow');
        table.integer("total_matches");
        table.integer("words_with_matches");
    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('DMP');
};
