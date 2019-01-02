module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      database: "pg_trigger",
      charset: "utf8"
    },
    migrations: {
      directory: "./migrations"
    }
  }
}
