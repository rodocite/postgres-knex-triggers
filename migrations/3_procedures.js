const EVENT_PROCEDURE = `
  CREATE OR REPLACE FUNCTION log_event()
    RETURNS trigger AS $$
    BEGIN
      INSERT INTO events (
        record_id,
        old_first_name,
        old_last_name,
        old_age,
        first_name,
        last_name,
        age,
        event,
        last_update
      )

      VALUES (
        NEW.id,
        OLD.first_name,
        OLD.last_name,
        OLD.age,
        NEW.first_name,
        NEW.last_name,
        NEW.age,
        TG_OP,
        now()
      );
      RETURN NEW;
    END
  $$ language 'plpgsql';
`

const DROP_EVENT_PROCEDURE = `DROP FUNCTION log_event`

exports.up = knex => knex.raw(EVENT_PROCEDURE)
exports.down = knex => knex.raw(DROP_EVENT_PROCEDURE)
