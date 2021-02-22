const mysql = require("mysql");
const employeePrompt = require("./src/employeePrompt");

/* Connect to database */
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678"
});

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
});

/* Initial startup display */
console.log("Welcome to the Employee Tracker!");
console.log("--------------------------------");

/* Process inquirer questions */
employeePrompt(connection);

/* Close database connection */
connection.end();