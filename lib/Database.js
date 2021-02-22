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
    return this.doQuery("SELECT * from department ORDER BY id").then(res => res);
  }

  /* Queries roles and returns results */
  queryRoles(deptId = 0) {
    if (deptId === 0) {
      return this.doQuery("SELECT * from role ORDER BY id").then(res => res);
    } else {
      return this.doQuery("SELECT * from role WHERE department_id=? ORDER BY id", [deptId]).then(res => res);
    }
  }

  /* Private function for performing a SQL query, returns a Promise of results */
  doQuery(query, params = []) {
    return new Promise((resolve) => {
      this.connection.query(query, params, (err, res) => {
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