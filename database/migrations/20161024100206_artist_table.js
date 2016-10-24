"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Artist', (table) => {
        table.increments("id"); //for the primary key UID 
        table.string('name');
    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('Artist');
};
