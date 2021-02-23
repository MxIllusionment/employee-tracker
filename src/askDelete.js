const inquirer = require("inquirer");

/* Asks user to select from available employees to delete */
async function deleteEmployee(db) {
  const employees = await db.queryEmployees();
  let empChoices = [];

  /* Construct employee options from query */
  employees.forEach(emp => empChoices.push(
    {
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id
    }
  ));

  /* If there are no employees, return a value to indicate this */
  if (empChoices.length === 0) {
    return null;
  }

  /* Form inquirer question */
  const question = [
    {
      type: "list",
      message: "Which employee would you like to delete?",
      name: "employee",
      loop: false,
      choices: empChoices
    }
  ];

  /* Prompt for employee choice */
  return inquirer.prompt(question);
}

/* Asks user to select from available roles to delete */
async function deleteRole(db) {
  const roles = await db.queryRoles();
  let roleChoices = [];

  /* Construct role options from query */
  roles.forEach(role => roleChoices.push(
    {
      name: role.title,
      value: role.id
    }
  ));

  /* If there are no roles, return a value to indicate this */
  if (roleChoices.length === 0) {
    return null;
  }

  /* Form inquirer question */
  const question = [
    {
      type: "list",
      message: "Which role would you like to delete?",
      name: "role",
      loop: false,
      choices: roleChoices
    },
    {
      type: "confirm",
      message: "This will delete all employees with this role! Are you sure?",
      name: "confirm",
      default: false
    }
  ];

  /* Prompt for role choice */
  return inquirer.prompt(question);
}

/* Asks user to select from available departments to delete */
async function deleteDepartment(db) {
  const departments = await db.queryDepartments();
  let deptChoices = [];

  /* Construct department options from query */
  departments.forEach(dept => deptChoices.push(
    {
      name: dept.name,
      value: dept.id
    }
  ));

  /* If there are no departments, return a value to indicate this */
  if (deptChoices.length === 0) {
    return null;
  }

  /* Form inquirer question */
  const question = [
    {
      type: "list",
      message: "Which department would you like to delete?",
      name: "department",
      loop: false,
      choices: deptChoices
    },
    {
      type: "confirm",
      message: "This will delete all roles and employees in this department! Are you sure?",
      name: "confirm",
      default: false
    }
  ];

  /* Prompt for department choice */
  return inquirer.prompt(question);
}

module.exports = {
  employee: deleteEmployee,
  role: deleteRole,
  department: deleteDepartment
};