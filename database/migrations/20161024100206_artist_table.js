"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Artist', (table) => {
        table.increments("id"); //for the primary key UID 
        table.string('name');
        table.integer('average_matches');
        table.integer('average_flow_wordcount');
    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('Artist');
};
