const rn = require("random-fullName")
const ra = require("random-age")
const config = require("./knexfile")
const knex = require("knex")(config.development)

const name = rn().split(" ")
const age = ra()

knex("users")
  .insert({
    first_name: name[0],
    last_name: name[1],
    age
  })
  .return({ inserted: true })
