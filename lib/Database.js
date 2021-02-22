const mysql = require("mysql");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "12345678",
      database: "business_db"
    });

    this.connection.connect(function (err) {
      if (err) {
        console.error("Error connecting: " + err.stack);
        return;
      }
    });
  }

  /* Queries all departments and returns results */
  queryDepartments() {
    return this.doQuery("SELECT * from department").then(res => res);
  }

  /* Private function for performing a SQL query, returns a Promise of results */
  doQuery(query) {
    return new Promise((resolve) => {
      this.connection.query(query, (err, res) => {
        if (err) throw err;
        resolve(res);
      });
    });
  }

  /* Shuts down database connection */
  exit() {
    this.connection.end();
    this.connection = null;
  }
}

module.exports = Database;