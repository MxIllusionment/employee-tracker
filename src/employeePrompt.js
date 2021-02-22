const inquirer = require("inquirer");
const cTable = require("console.table");

/* Inquirer questions for basic actions */
const actionQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: [
      "View Departments",
      "View Roles",
      "View Employees",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Exit"
    ]
  }
];

/* Displays all departments */
function viewDepartments(db) {
  console.log("Departments");
}

/* Displays all roles or by department, as chosen by user*/
function viewRoles(db) {
  console.log("Roles");
}

/* Displays all employees or by department, as chosen by user*/
function viewEmployees(db) {
  console.log("Employees");
}

/* Add a department */
function addDepartment(db) {
  console.log("Add department");
}

/* Add a role */
function addRole(db) {
  console.log("Add role");
}

/* Add an employee */
function addEmployee(db) {
  console.log("Add employee");
}

function employeePrompt(db) {
  return inquirer.prompt(actionQuestions)
    .then(answers => {
      /* Drop out of then() if Exit is chosen */
      if (answers.action != "Exit") {
        switch (answers.action) {
          case "View Departments":
            viewDepartments(db);
            break;
          case "View Roles":
            viewRoles(db);
            break;
          case "View Employees":
            viewEmployees(db);
            break;
          case "Add Department":
            addDepartment(db);
            break;
          case "Add Role":
            addRole(db);
            break;
          case "Add Employee":
            addEmployee(db);
            break;
        }
        return employeePrompt(db);
      }
    });
}

module.exports = employeePrompt;