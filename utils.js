module.exports = {
  log: (source, message) => {
    console.log(`${ Date.now() }\t${ source }\t${ message }`);
  }
}
