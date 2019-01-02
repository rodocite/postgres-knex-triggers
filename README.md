# Postgres Triggers w/ Knex
Playing around w/ Postgres triggers in Knex.
Records written to `users` will fire a Postgres trigger that writes the event into the `events` table.

1. create `pg_trigger` db
2. create `users` table
3 create `events` table
3. create `log_event()` postgres function
4. create `event` trigger which uses `log_event()`

## Getting Started
```sh
brew install postgres
npm install -g yarn
yarn setup
# localhost:3000
# insert or update records (db: pg_trigger, table: users)
# postgres triggers will write into the events table
# the updates will be reflected on the front-end
```

## Output
```
Record 1 - Lulu Henry age 45 was updated to Lulu Jackson age 46.
Record 1 - Lulu Jackson age 46 was updated to Lulu Jackson age 47.
Record 1 - Lulu Jackson age 46 was deleted.
Record 2 - Rodolfo Yabut age 37 was created.
```

## Code
The trigger:
```sql
CREATE TRIGGER event
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE log_event();
```

The function the trigger is using:
```sql
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
```

## License

MIT © [rodocite](https://github.com/rodocite)
