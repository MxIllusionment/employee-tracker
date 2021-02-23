const Database = require("./lib/Database");
const actionPrompt = require("./src/actionPrompt");

/* Start up database connection */
const db = new Database();

db.start()
  .then(() => {
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
  });



