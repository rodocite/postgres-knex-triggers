exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table
      .increments("id")
      .unsigned()
      .primary()
    table.string("first_name")
    table.string("last_name")
    table.integer("age").unsigned()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("users")
}
