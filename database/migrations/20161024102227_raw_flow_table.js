"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Raw', (table) => {
        table.increments("id"); //for the primary key UID 
        table.string('flow');
        table.integer("length");
    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('Raw');
};
