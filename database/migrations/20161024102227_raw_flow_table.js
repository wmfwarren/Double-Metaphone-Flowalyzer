"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Raw', (table) => {
        table.increments("id"); //for the primary key UID 
        table.string('flow', 4095);
        table.integer("length");
        table.integer("unique_words");
        //lord length info
        table.float("average_word_length");
        table.float("word_length_stdev");
        table.float("word_percent_rsd");
        table.integer("mode_word_length");
        table.float("median_word_length");
        //line info
        table.integer("number_of_lines");
        table.float("mean_words_by_line");
        table.integer("mode_words_by_line");
        table.float("median_words_by_line");
        table.float("stdev_words_by_line");
    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('Raw');
};
