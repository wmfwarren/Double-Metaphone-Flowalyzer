"use strict";

module.exports.up = (knex, Promise) => {
  return knex.schema.createTable('Match', (table) => {
        table.increments("id"); //for the primary key UID 
        table.string('search_string');
        table.integer("dmp_flow_id").references("DMP.id");
        table.integer("total_matches");
        table.boolean("-15match").defaultTo(false);
        table.boolean("-14match").defaultTo(false);
        table.boolean("-13match").defaultTo(false);
        table.boolean("-12match").defaultTo(false);
        table.boolean("-11match").defaultTo(false);
        table.boolean("-10match").defaultTo(false);
        table.boolean("-9match").defaultTo(false);
        table.boolean("-8match").defaultTo(false);
        table.boolean("-7match").defaultTo(false);
        table.boolean("-6match").defaultTo(false);
        table.boolean("-5match").defaultTo(false);
        table.boolean("-4match").defaultTo(false);
        table.boolean("-3match").defaultTo(false);
        table.boolean("-2match").defaultTo(false);
        table.boolean("-1match").defaultTo(false);
        table.boolean("+1match").defaultTo(false);
        table.boolean("+2match").defaultTo(false);
        table.boolean("+3match").defaultTo(false);
        table.boolean("+4match").defaultTo(false);
        table.boolean("+5match").defaultTo(false);
        table.boolean("+6match").defaultTo(false);
        table.boolean("+7match").defaultTo(false);
        table.boolean("+8match").defaultTo(false);
        table.boolean("+9match").defaultTo(false);
        table.boolean("+10match").defaultTo(false);
        table.boolean("+11match").defaultTo(false);
        table.boolean("+12match").defaultTo(false);
        table.boolean("+13match").defaultTo(false);
        table.boolean("+14match").defaultTo(false);
        table.boolean("+15match").defaultTo(false);

    })
};

module.exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('Match');
};
