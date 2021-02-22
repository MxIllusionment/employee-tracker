const mysql = require("mysql");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "12345678"
    });

    this.connection.connect(function (err) {
      if (err) {
        console.error("Error connecting: " + err.stack);
        return;
      }
    });
  }

  /* Shuts down database connection */
  exit() {
    this.connection.end();
    this.connection = null;
  }
}

module.exports = Database;