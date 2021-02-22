const inquirer = require("inquirer");
const cTable = require("console.table");

var gDB;

/* Inquirer questions for basic actions */
const actionQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: [
      "View Departments",
      "View Roles",
      "View Employees By Department",
      "View Employees By Manager",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Exit"
    ]
  }
];

/* -------------- UTILITY Functions ------------------ */
/* Asks user to select from available departments */
async function askDepartment() {
  const departments = await gDB.queryDepartments();
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

  /* Prompt for department choice */
  return inquirer.prompt(question);
}

/* Asks user to select from available managers */
async function askManager() {
  const managers = await gDB.queryManagers();
  const mgrChoices = [];

  /* Construct manager options from query */
  managers.forEach(mgr => mgrChoices.push(
    {
      name: `${mgr.first_name} ${mgr.last_name}`,
      value: mgr.id
    }
  ));

  /* Form inquirer question */
  const question = [
    {
      type: "list",
      message: "Which manager would you like to view?",
      name: "manager",
      choices: mgrChoices
    }
  ];

  /* Prompt for manager choice */
  return inquirer.prompt(question);
}


/* ---------- ACTION Functions ------------- */
/* Displays all departments */
async function viewDepartments() {
  const res = await gDB.queryDepartments();
  console.table(res);
}

/* Displays all roles or by department, as chosen by user*/
async function viewRoles() {
  await askDepartment()
    .then(async answers => {
      let res = await gDB.queryRoles(answers.department);
      console.table(res);
    });
}

/* Displays all employees or by department, as chosen by user*/
async function viewEmployeesByDept() {
  await askDepartment()
    .then(async answers => {
      let res = await gDB.queryEmployees("department", answers.department);
      console.table(res);
    });
}

/* Displays employees based on a specific manager */
async function viewEmployeesByMgr() {
  await askManager()
    .then(async answers => {
      let res = await gDB.queryEmployees("manager", answers.manager);
      console.table(res);
    });
}

/* Add a department */
function addDepartment() {
  console.log("Add department");
}

/* Add a role */
function addRole() {
  console.log("Add role");
}

/* Add an employee */
function addEmployee() {
  console.log("Add employee");
}

/* -------- Core PROMPT Function ---------- */

/* Prompt for primary action */
function actionPrompt(db) {
  gDB = db;
  return inquirer.prompt(actionQuestions)
    .then(async answers => {
      if (answers.action !== "Exit") {
        switch (answers.action) {
          case "View Departments":
            await viewDepartments();
            break;
          case "View Roles":
            await viewRoles();
            break;
          case "View Employees By Department":
            await viewEmployeesByDept();
            break;
          case "View Employees By Manager":
            await viewEmployeesByMgr();
            break;
          case "Add Department":
            addDepartment();
            break;
          case "Add Role":
            addRole();
            break;
          case "Add Employee":
            addEmployee();
            break;
        }
        return actionPrompt(db);
      }
    });
}

module.exports = actionPrompt;