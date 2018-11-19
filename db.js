const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite3');

module.exports = async (targets) => {
  // Check that tables exist for each target
  // If not, create those tables
  await targets.forEach(target => {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${ target.slug } (
        id integer primary key not null,
        timestamp datetime not null,
        status integer not null,
        duration integer not null
      )`,
      err => {
        if (err) throw err;
      }
    );
  });

  return db;
}
