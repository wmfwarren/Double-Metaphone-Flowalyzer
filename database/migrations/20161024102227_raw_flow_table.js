"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Raw', (table) => {
        table.increments("id"); //for the primary key UID 
        table.string('flow', 4095);
        table.integer("length");
        table.integer("unique_words");
        table.float("average_word_length");
    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('Raw');
};
