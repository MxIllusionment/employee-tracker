const inquirer = require("inquirer");

/* Asks user to select from available departments */
async function askDepartment(db) {
  const departments = await db.queryDepartments();
  const deptChoices = [
    {
      name: "All",
      value: 0
    }
  ];

  /* Construct department options from query */
  departments.forEach(dept => deptChoices.push(
    {
      name: dept.name,
      value: dept.id
    }
  ));

  /* If there are no departments, return a value to indicate this */
  if (deptChoices.length === 1) {
    return [
      {
        department: -1
      }
    ];
  }

  /* Form inquirer question */
  const question = [
    {
      type: "list",
      message: "Which department would you like to view?",
      name: "department",
      loop: false,
      choices: deptChoices
    }
  ];

  /* Prompt for department choice */
  return inquirer.prompt(question);
}

/* Asks user to select from available managers */
async function askManager(db) {
  const managers = await db.queryManagers();
  const mgrChoices = [];

  /* Construct manager options from query */
  managers.forEach(mgr => mgrChoices.push(
    {
      name: `${mgr.first_name} ${mgr.last_name}`,
      value: mgr.id
    }
  ));

  /* If there are no managers, return a value to indicate this */
  if (mgrChoices.length === 0) {
    return [
      {
        manager: -1
      }
    ];
  }

  /* Form inquirer question */
  const question = [
    {
      type: "list",
      message: "Which manager would you like to view?",
      name: "manager",
      loop: false,
      choices: mgrChoices
    }
  ];

  /* Prompt for manager choice */
  return inquirer.prompt(question);
}

module.exports = {
  department: askDepartment,
  manager: askManager
};