const mysql = require("mysql");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
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

  /* Queries all employees that are managers*/
  queryManagers() {
    return this.doQuery("SELECT * from employee WHERE id IN (SELECT manager_id FROM employee) ORDER BY id").then(res => res);
  }

  /* Queries roles and returns results */
  queryRoles(deptId = 0) {
    const queryStart = "SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id";
    const querySort = "ORDER BY role.id";

    if (deptId === 0) {
      return this.doQuery(`${queryStart} ${querySort}`).then(res => res);
    } else {
      return this.doQuery(`${queryStart} WHERE role.department_id = ? ${querySort}`, [deptId]).then(res => res);
    }
  }

  /* Queries employees and returns results. Valid selectors are "department" and "manager" */
  queryEmployees(selector = "", id = 0) {
    const queryStart = `SELECT employee.id, employee.first_name, employee.last_name, 
    role.title AS role, role.salary AS salary, department.name AS department, COALESCE(CONCAT(manager.first_name,' ', manager.last_name), 'None') AS manager 
    FROM employee INNER JOIN role ON employee.role_id = role.id 
    INNER JOIN department ON role.department_id = department.id 
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;

    const querySort = "ORDER BY employee.id";

    /* Query without predicate */
    if (id === 0 || selector === "") {
      return this.doQuery(`${queryStart} ${querySort}`).then(res => res);
    }

    let predColumn;

    /* Choose column in predicate based on selector */
    switch (selector) {
      case "department":
        predColumn = "role.department_id";
        break;
      case "manager":
        predColumn = "employee.manager_id";
        break;
      default:
        throw new Error("Invalid selector");
    }
    return this.doQuery(`${queryStart} WHERE ${predColumn} = ? ${querySort}`, [id]).then(res => res);
  }

  /* Private function for performing a SQL query, returns a Promise of results */
  doQuery(query, params = []) {
    if (this.connection === null) {
      throw new Error("Attempted query after exiting database");
    }

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