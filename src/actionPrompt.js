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
async function viewDepartments(db) {
  const res = await db.queryDepartments();
  console.table(res);
}

/* Displays all roles or by department, as chosen by user*/
async function viewRoles(db) {
  const departments = await db.queryDepartments();
  const deptChoices = [
    {
      name: "All",
      value: 0
    }
  ];

  /* Construct department options from query */
  departments.forEach(dept => deptChoices.push({ name: dept.name, value: dept.id }));

  /* Form inquirer question */
  const question = [
    {
      type: "list",
      message: "Which department would you like to view?",
      name: "department",
      choices: deptChoices
    }
  ];

  /* Prompt for department choice and display results */
  await inquirer.prompt(question)
    .then(async answers => {
      let res = await db.queryRoles(answers.department);
      console.table(res);
    });
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

/* Prompt for primary action */
function actionPrompt(db) {
  return inquirer.prompt(actionQuestions)
    .then(async answers => {
      if (answers.action !== "Exit") {
        switch (answers.action) {
          case "View Departments":
            await viewDepartments(db);
            break;
          case "View Roles":
            await viewRoles(db);
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
        return actionPrompt(db);
      }
    });
}

module.exports = actionPrompt;