const inquirer = require("inquirer");

/* Asks for information needed to create a department */
function createDepartment() {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "What is the name of the new department?"
    }
  ];
  return inquirer.prompt(questions);
}

/* Asks for information needed to create a role */
async function createRole(db) {
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

  const questions = [
    {
      type: "list",
      name: "department_id",
      message: "Which department is the new role in?",
      loop: false,
      choices: deptChoices
    },
    {
      type: "input",
      name: "title",
      message: "What is the title associated with the new role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for the new role?"
    }
  ];

  return inquirer.prompt(questions);
}


module.exports = {
  department: createDepartment,
  role: createRole
}