const inquirer = require("inquirer");
require("console.table");
const ask = require("./askSelector");
const create = require("./askCreate");
const update = require("./askUpdate");

/* Inquirer questions for basic actions */
const actionQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    loop: false,
    choices: [
      "View Departments",
      "View Roles By Department",
      "View Employees By Department",
      "View Employees By Manager",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee",
      "Exit"
    ]
  }
];

/* ---------- UTILITY Functions ------------- */
/* Displays view results as a table or displays a "none found" message */
function displayView(res, type) {
  if (res.length > 0) {
    console.log("");
    console.table(res);
  } else {
    console.log(`\nNo ${type} found\n`);
  }
}

/* ---------- ACTION Functions ------------- */
/* Displays all departments */
function viewDepartments(db) {
  return db.queryDepartments().then(res => displayView(res, "departments"));
}

/* Displays all roles or by department, as chosen by user*/
async function viewRoles(db) {
  return ask.department(db)
    .then(answers => {
      if (!answers) {
        return [];
      }
      return db.queryRoles(answers.department);
    })
    .then(res => displayView(res, "roles"));
}

/* Displays all employees or by department, as chosen by user*/
async function viewEmployeesByDept(db) {
  return ask.department(db)
    .then(answers => {
      if (!answers) {
        return [];
      }
      return db.queryEmployees("department", answers.department);
    })
    .then(res => displayView(res, "employees"));
}

/* Displays employees based on a specific manager */
async function viewEmployeesByMgr(db) {
  return ask.manager(db)
    .then(answers => {
      if (!answers) {
        return [];
      }
      return db.queryEmployees("manager", answers.manager);
    })
    .then(res => displayView(res, "employees"));
}

/* Add a department */
async function addDepartment(db) {
  return create.department()
    .then(answers => db.addDepartment(answers))
    .then(res => console.log(`\n${res.affectedRows} department added\n`));
}

/* Add a role */
async function addRole(db) {
  return create.role(db)
    .then(answers => {
      if (!answers) {
        return null;
      }
      return db.addRole(answers);
    })
    .then(res => {
      if (!res) {
        return console.log("\nNo departments available\n");
      }
      return console.log(`\n${res.affectedRows} role added\n`)
    });
}

/* Add an employee */
async function addEmployee(db) {
  return create.employee(db)
    .then(answers => {
      if (!answers) {
        return null;
      }
      return db.addEmployee(answers);
    })
    .then(res => {
      if (!res) {
        return console.log("\nNo roles available\n");
      }
      return console.log(`\n${res.affectedRows} employee added\n`)
    });
}

/* Update an employee */
async function updateEmployee(db) {
  return update.employee(db)
    .then(answers => {
      if (!answers) {
        return null;
      }
      if (answers.role_id) {
        return db.updateEmployee(answers.id, {
          role_id: answers.role_id
        });
      } else {
        return db.updateEmployee(answers.id, {
          manager_id: answers.manager_id
        });
      }
    })
    .then(res => {
      if (!res) {
        return console.log("\nNo employees found\n");
      }
      return console.log(`\n${res.affectedRows} employee updated\n`)
    });
}

/* -------- Core PROMPT Function ---------- */

/* Prompt for primary action */
function actionPrompt(db) {
  return inquirer.prompt(actionQuestions)
    .then(async answers => {
      if (answers.action !== "Exit") {
        switch (answers.action) {
          case "View Departments":
            await viewDepartments(db);
            break;
          case "View Roles By Department":
            await viewRoles(db);
            break;
          case "View Employees By Department":
            await viewEmployeesByDept(db);
            break;
          case "View Employees By Manager":
            await viewEmployeesByMgr(db);
            break;
          case "Add Department":
            await addDepartment(db);
            break;
          case "Add Role":
            await addRole(db);
            break;
          case "Add Employee":
            await addEmployee(db);
            break;
          case "Update Employee":
            await updateEmployee(db);
            break;
        }
        return actionPrompt(db);
      }
    });
}

module.exports = actionPrompt;