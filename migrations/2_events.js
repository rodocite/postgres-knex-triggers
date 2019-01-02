exports.up = function(knex) {
  return knex.schema.createTable("events", table => {
    table
      .increments("id")
      .unsigned()
      .primary()
    table.integer("record_id").unsigned()
    table.string("old_first_name")
    table.string("old_last_name")
    table.integer("old_age").unsigned()
    table.string("first_name")
    table.string("last_name")
    table.integer("age").unsigned()
    table.string("event")
    table.dateTime("last_update").nullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("events")
}
