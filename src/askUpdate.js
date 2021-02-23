const inquirer = require("inquirer");

async function updateEmployee(db) {
  const employees = await db.queryEmployees();
  const roles = await db.queryRoles();

  let empChoices = [];

  /* Construct employee options from query */
  employees.forEach(employee => empChoices.push(
    {
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }
  ));

  /* If there are no employees, return a value to indicate this */
  if (empChoices.length === 0) {
    return null;
  }

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Which employee would you like to update?",
      loop: false,
      choices: empChoices
    },
    {
      type: "list",
      name: "option",
      message: "What information would you like to update?",
      choices: ["Role", "Manager"]
    },
    {
      type: "list",
      name: "role_id",
      message: "What role would you like to assign to the employee?",
      loop: false,
      choices: () => {
        let roleChoices = [];

        roles.forEach(role => roleChoices.push(
          {
            name: role.title,
            value: role.id
          }
        ));
        return roleChoices;
      },
      when: answers => answers.option === "Role"
    },
    {
      type: "list",
      name: "manager_id",
      message: "Which manager would you like to assign to the employee?",
      loop: false,
      choices: answers => {
        let mgrChoices = [
          {
            name: "None",
            value: null
          }
        ];

        employees.forEach(employee => {
          if (employee.id != answers.id) {
            mgrChoices.push(
              {
                name: `${employee.first_name} ${employee.last_name} (${employee.role})`,
                value: employee.id
              }
            )
          }
        });
        return mgrChoices;
      },
      when: answers => answers.option === "Manager"
    }
  ];

  return inquirer.prompt(questions);
}


module.exports = {
  employee: updateEmployee
};