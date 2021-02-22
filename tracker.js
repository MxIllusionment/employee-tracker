const Database = require("./lib/Database");
const employeePrompt = require("./src/employeePrompt");

/* Start up database connec tion */
const db = new Database();

/* Initial startup display */
console.log("Welcome to the Employee Tracker!");
console.log("--------------------------------");

/* Process inquirer questions */
employeePrompt(db)
  .then(() => {
    console.log("--------------------------------");
    console.log("Exiting Employee Tracker. Farewell!");
    db.exit();
  });

