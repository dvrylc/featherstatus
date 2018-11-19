// Constants
const db = require('./db');
const fetch = require ('./src/fetch');

// Init
(async () => {
  await db.init();
  await fetch.init();
})();

// Shutdown
async function shutdown(signal) {
  await fetch.clear();
  await db.close();

  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
