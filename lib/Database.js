const mysql = require("mysql");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "12345678",
      database: "employee_tracker_db"
    });
  }

  /* Queries all departments and returns results */
  queryDepartments() {
    return this.doQuery(`SELECT department.id, department.name, COALESCE(SUM(role.salary), 0) AS budget
    FROM department
    LEFT JOIN (employee INNER JOIN role ON employee.role_id = role.id) ON role.department_id = department.id
    GROUP BY department.id
    ORDER BY id`);
  }

  /* Queries all employees that are managers*/
  queryManagers() {
    return this.doQuery("SELECT * FROM employee WHERE id IN (SELECT manager_id FROM employee) ORDER BY id");
  }

  /* Queries roles and returns results */
  queryRoles(deptId = 0) {
    const queryStart = "SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id";
    const querySort = "ORDER BY role.id";

    if (deptId === 0) {
      return this.doQuery(`${queryStart} ${querySort}`);
    } else {
      return this.doQuery(`${queryStart} WHERE role.department_id = ? ${querySort}`, [deptId]);
    }
  }

  /* Queries employees and returns results. Valid selectors are "department" and "manager" */
  queryEmployees(selector = "", id = 0) {
    const queryStart = `SELECT employee.id, employee.first_name, employee.last_name, 
    role.title AS role, role.salary AS salary, department.name AS department, COALESCE(CONCAT(manager.first_name, ' ', manager.last_name), 'None') AS manager 
    FROM employee INNER JOIN role ON employee.role_id = role.id 
    INNER JOIN department ON role.department_id = department.id 
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;

    const querySort = "ORDER BY employee.id";

    /* Query without predicate */
    if (id === 0 || selector === "") {
      return this.doQuery(`${queryStart} ${querySort}`);
    }

    let whereObj = {};

    /* Choose column in predicate based on selector */
    switch (selector) {
      case "department":
        whereObj["role.department_id"] = id;
        break;
      case "manager":
        whereObj["employee.manager_id"] = id;
        break;
      default:
        throw new Error("Invalid selector");
    }
    return this.doQuery(`${queryStart} WHERE ? ${querySort}`, whereObj);
  }

  /* Inserts a new department into the department table */
  addDepartment(data) {
    const query = "INSERT INTO department SET ?";

    return this.doQuery(query, data);
  }

  /* Inserts a new role into the role table */
  addRole(data) {
    const query = "INSERT INTO role SET ?";

    return this.doQuery(query, data);
  }

  /* Inserts a new employee into the employee table */
  addEmployee(data) {
    const query = "INSERT INTO employee SET ?";

    return this.doQuery(query, data);
  }

  /* Updates an employee based on data and ID */
  updateEmployee(id, data) {
    const query = "UPDATE employee SET ? WHERE ?";

    return this.doQuery(query, [data, { id: id }]);
  }

  /* Deletes an employee */
  deleteEmployee(id) {
    const query = "DELETE FROM employee WHERE id = ?";

    return this.doQuery(query, id);
  }

  /* Deletes a role */
  deleteRole(id) {
    const query = "DELETE FROM role WHERE id = ?";

    return this.doQuery(query, id);
  }

  /* Deletes a department */
  deleteDepartment(id) {
    const query = "DELETE FROM department WHERE id = ?";

    return this.doQuery(query, id);
  }

  /* Private function for performing a SQL query, returns results */
  doQuery(query, params = []) {
    if (this.connection.state === "disconnected") {
      throw new Error("Attempted query without database connection");
    }

    const ret = new Promise((resolve) => {
      this.connection.query(query, params, (err, res) => {
        if (err) throw err;
        resolve(res);
      });
    });

    return ret.then(res => res);
  }

  /* Opens database connection and returns a promise */
  open() {
    return new Promise((resolve, reject) => this.connection.connect(err => {
      if (err) {
        console.error("Error connecting: " + err.stack);
        reject(err);
      }
      resolve();
    }));
  }

  /* Shuts down database connection */
  close() {
    this.connection.end();
  }
}

module.exports = Database;