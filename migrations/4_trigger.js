const TRIGGER = `
    CREATE TRIGGER event
        AFTER INSERT OR UPDATE OR DELETE ON users
        FOR EACH ROW
        EXECUTE PROCEDURE log_event();
`

const DROP_TRIGGER = `DROP TRIGGER event`

exports.up = knex => knex.raw(TRIGGER)
exports.down = knex => knex.raw(DROP_TRIGGER)
