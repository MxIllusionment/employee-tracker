# employee-tracker
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
## Description
A node.js command-line application that allows interaction with a simple employee database. Users may add and delete departments, roles within those departments, and employees. Employees may also be updated.

This is only intended to interact with a localhost MySQL server initialized with the provided SQL schema file.

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Deployment](#Deployment)
* [License](#License)
* [Questions](#Questions)
* [Credits](#Credits)

## Installation
A localhost MySQL server must be available to use this application. To install and create the required schema, run the following commands:
```
npm install
npm run schema
```

Example seed data can also be installed with
```
npm run seed
```

## Usage
Execute with
```
npm start
```

[Walkthrough Video](#)

## License  
This application is covered under the **ISC** license. More info can be found here: [ISC](https://opensource.org/licenses/ISC)

## Questions
Questions about the project? You can contact me at malenchite@gmail.com or check out my GitHub profile at [malenchite](https://github.com/malenchite)

## Credits
#### NPM Packages
* [mysql](https://www.npmjs.com/package/mysql)
* [inquirer](https://www.npmjs.com/package/inquirer)
* [console.table](https://www.npmjs.com/package/console.table)
