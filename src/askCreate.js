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

/* Asks for information needed to create an employee */
async function createEmployee(db) {
  const roles = await db.queryRoles();
  const employees = await db.queryEmployees();
  let roleChoices = [];
  let mgrChoices = [
    {
      name: "None",
      value: null
    }
  ];

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

  /* Construct manager options from query */
  employees.forEach(employee => mgrChoices.push(
    {
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }
  ));

  const questions = [
    {
      type: "list",
      name: "role_id",
      message: "What role does the new employee have?",
      loop: false,
      choices: roleChoices
    },
    {
      type: "input",
      name: "first_name",
      message: "What is the first name of the new employee?"
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name of the new employee?"
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is the new employee's manager?",
      choices: mgrChoices,
      when: () => mgrChoices.length > 1
    }
  ];

  return inquirer.prompt(questions);
}


module.exports = {
  department: createDepartment,
  role: createRole,
  employee: createEmployee
}