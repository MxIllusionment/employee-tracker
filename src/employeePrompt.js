const inquirer = require("inquirer");
const cTable = require("console.table");

const employeeQuestions = [

];


function employeePrompt(conn) {
  return inquirer.prompt(employeeQuestions)
    .then(answers => {

    });
}

module.exports = employeePrompt;