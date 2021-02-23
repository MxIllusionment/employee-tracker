const inquirer = require("inquirer");

/* Asks user to select from available employees */
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

  /* Prompt for manager choice */
  return inquirer.prompt(question);
}

module.exports = {
  employee: deleteEmployee
};