const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  // Create a table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS items (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      image VARCHAR(1000) NOT NULL,
      label VARCHAR(255) NOT NULL
    );`)
    .error(err => {
      console.log(err);
    });
};