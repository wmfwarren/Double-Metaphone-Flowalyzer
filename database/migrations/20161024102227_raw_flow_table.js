"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Raw', (table) => {
        table.increments("id"); //for the primary key UID 
        table.string('flow', 4095);
        table.integer("length");
        table.integer("unique_words");
        table.float("average_word_length");
        table.float("word_length_stdev");
        table.float("word_percent_rsd");
        table.integer("mode_word_length");
        table.float("median_word_length");
    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('Raw');
};
