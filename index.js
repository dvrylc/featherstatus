// Load targets
const config = require('./config.json');
const targets = config.targets;

// Constants
let db, intervalIDs;

// Init
(async () => {
  db = await require('./db')(targets);
  intervalIDs = await require('./src/fetch')(db, targets);
})();

// Shutdown
async function shutdown(signal) {
  await intervalIDs.forEach(id => { clearInterval(id); });
  await db.close();

  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
