const inquirer = require("inquirer");
require("console.table");
const ask = require("./askSelector");

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
    .then(answers => db.queryRoles(answers.department))
    .then(res => displayView(res, "roles"));
}

/* Displays all employees or by department, as chosen by user*/
async function viewEmployeesByDept(db) {
  return ask.department(db)
    .then(answers => db.queryEmployees("department", answers.department))
    .then(res => displayView(res, "employees"));
}

/* Displays employees based on a specific manager */
async function viewEmployeesByMgr(db) {
  return ask.manager(db)
    .then(answers => db.queryEmployees("manager", answers.manager))
    .then(res => displayView(res, "employees"));
}

/* Add a department */
async function addDepartment(db) {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "What is the name of the new department?"
    }
  ];
  return inquirer.prompt(questions)
    .then(answers => db.addDepartment(answers))
    .then(res => console.log(`${res.affectedRows} department added\n`))
}

/* Add a role */
function addRole(db) {
  console.log("Add role");
}

/* Add an employee */
function addEmployee(db) {
  console.log("Add employee");
}

/* Update an employee */
function updateEmployee(db) {
  console.log("Update employee");
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
            addRole(db);
            break;
          case "Add Employee":
            addEmployee(db);
            break;
          case "Update Employee":
            updateEmployee(db);
            break;
        }
        return actionPrompt(db);
      }
    });
}

module.exports = actionPrompt;