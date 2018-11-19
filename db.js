const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db.sqlite3');
const targets = require('./config.json').targets;

module.exports = {
  init: async () => {
    await targets.forEach(target => {
      db.run(
        `CREATE TABLE IF NOT EXISTS ${ target.slug } (
          id integer primary key not null,
          timestamp datetime not null,
          status integer not null,
          duration integer not null
        )`,
        err => {
          if (err) throw new Error(err);
        }
      );
    });
  },

  close: () => {
    db.close();
  },

  getDB: () => {
    return db;
  }
}
