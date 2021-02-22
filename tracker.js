const Database = require("./lib/Database");
const actionPrompt = require("./src/actionPrompt");

/* Start up database connec tion */
const db = new Database();

/* Initial startup display */
console.log("Welcome to the Employee Tracker!");
console.log("--------------------------------");

/* Process inquirer questions */
actionPrompt(db)
  .then(() => {
    console.log("--------------------------------");
    console.log("Exiting Employee Tracker. Farewell!");
    db.exit();
  });

