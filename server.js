const express = require("express")
const next = require("next")
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const config = require("./knexfile")
const knex = require("knex")(config.development)

app
  .prepare()
  .then(() => {
    const server = express()

    server.get("/events", (req, res) => {
      knex("events").then(data => {
        res.end(JSON.stringify(data))
      })
    })

    server.get("*", (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log("> Ready on http://localhost:3000")
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
