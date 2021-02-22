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
function viewDepartments(conn) {
  console.log("Departments");
}

/* Displays all roles or by department, as chosen by user*/
function viewRoles(conn) {
  console.log("Roles");
}

/* Displays all employees or by department, as chosen by user*/
function viewEmployees(conn) {
  console.log("Employees");
}

/* Add a department */
function addDepartment(conn) {
  console.log("Add department");
}

/* Add a role */
function addRole(conn) {
  console.log("Add role");
}

/* Add an employee */
function addEmployee(conn) {
  console.log("Add employee");
}

function employeePrompt(conn) {
  return inquirer.prompt(actionQuestions)
    .then(answers => {
      /* Drop out of then() if Exit is chosen */
      if (answers.action != "Exit") {
        switch (answers.action) {
          case "View Departments":
            viewDepartments(conn);
            break;
          case "View Roles":
            viewRoles(conn);
            break;
          case "View Employees":
            viewEmployees(conn);
            break;
          case "Add Department":
            addDepartment(conn);
            break;
          case "Add Role":
            addRole(conn);
            break;
          case "Add Employee":
            addEmployee(conn);
            break;
        }
        return employeePrompt(conn);
      }
    });
}

module.exports = employeePrompt;