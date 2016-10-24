"use strict";

//join table

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Flow', (table) => {
        table.increments("id"); //for the primary key UID 
        table.integer('rapper_id').references("Artist.id");
        table.integer('track_id').references("Track.id");
        table.integer('raw_flow_id').references("Raw.id");
        table.integer('dmp_flow_id').references("DMP.id");
    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('Flow');
};
