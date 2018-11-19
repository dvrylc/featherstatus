const fetch = require('node-fetch');

// Utilities
const utils = require('../utils');

// Start fetching data for each target
// according to target's interval
module.exports = async (db, targets) => {
  let intervalIDs = [];

  await targets.forEach(target => {
    const id = setInterval(async () => {
      const startTime = Date.now();

      try {
        const res = await fetch(target.location, { size: 1e+7 });

        const endTime = Date.now();
        const duration = endTime - startTime;

        db.run(
          `INSERT INTO ${ target.slug } (timestamp, status, duration) VALUES (?, ?, ?)`,
          [endTime, res.status, duration],
          err => {
            if (err) throw new Error(err);

            utils.log('fetch', `${ target.slug } ${ res.status }`);
          }
        );
      } catch (err) {
        const endTime = Date.now();

        db.run(
          `INSERT INTO ${ target.slug } (timestamp, status, duration) VALUES (?, ?, ?)`,
          [endTime, 404, 0],
          err => {
            if (err) throw new Error(err);

            utils.log('fetch', `${ target.slug } 404`);
          }
        );
      }
    }, target.interval * 60000);

    intervalIDs.push(id);
  });

  return intervalIDs;
}
