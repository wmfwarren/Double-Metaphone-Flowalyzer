"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('DMP', (table) => {
        table.increments("id"); //for the primary key UID 
        table.string('flow');
    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('DMP');
};
