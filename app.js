const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const organization = [];

init();

function init() {
  console.log(`Welcome to ${chalk.bold.green(
    "ORG-CHART"
  )}. This application will ask you for employee details and will produce a 
    formatted web page that displays your organizational structure chart`);
  
  createManager();
}

function buildTeam() {
  fs.writeFile(outputPath, render(organization), function(err){
    if (err) {
      return console.log(err);
    }
  });
  console.log(chalk.bold.green("Success!") + " HTML file created.")
}

function confirmNewEmployee() {
  inquirer
    .prompt({
      message: "Would you like to enter a new employee?",
      type: "confirm",
      name: "confirm",
    })
    .then(function (response) {
      if (response.confirm === true) {
        employeeMenu();
      } else {
        buildTeam();
      }
    });
}

function createManager() {
  inquirer
    .prompt([
      {
        message: "Enter " + chalk.red("manager") + " name: ",
        name: "name",
      },
      {
        message: "Enter " + chalk.red("manager") + " id#: ",
        name: "id",
      },
      {
        message: "Enter " + chalk.red("manager") + " email address: ",
        name: "email",
      },
      {
        message: "Enter " + chalk.red("manager") + " officeNumber: ",
        name: "officeNumber",
      },
    ])
    .then(function (answers) {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      organization.push(manager);
      confirmNewEmployee();
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        message: "Enter " + chalk.red("engineer") + " name: ",
        name: "name",
      },
      {
        message: "Enter  "+ chalk.red("engineer") + " id#: ",
        name: "id",
      },
      {
        message: "Enter "+ chalk.red("engineer") + " email address: ",
        name: "email",
      },
      {
        message: "Enter "+ chalk.red("engineer") + " github: ",
        name: "github",
      },
    ])
    .then(function (answers) {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      organization.push(engineer);
      confirmNewEmployee();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        message: "Enter "+ chalk.red("intern") + " name: ",
        name: "name",
      },
      {
        message: "Enter "+ chalk.red("intern") + " id#: ",
        name: "id",
      },
      {
        message: "Enter "+ chalk.red("intern") + " email address: ",
        name: "email",
      },
      {
        message: "Enter "+ chalk.red("intern") + " school: ",
        name: "school",
      },
    ])
    .then(function (answers) {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      organization.push(intern);
      confirmNewEmployee();
    });
}

function employeeMenu() {
  inquirer
    .prompt({
      message: "Please select an employee role: ",
      type: "checkbox",
      name: "empRole",
      choices: ["Intern", "Engineer"],
    })
    .then(function (input) {
      if (input.empRole == "Intern") {
        createIntern();
      }else if (input.empRole == "Engineer") {
        createEngineer();
      }
    });
}