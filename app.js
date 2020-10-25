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
  console.log(organization);
}

function confirmNewEmployee() {
  inquirer
    .prompt({
      //TODO: Create function to confirm if new employee
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
        message: "Enter manager name: ",
        name: "name",
      },
      {
        message: "Enter manager id#: ",
        name: "id",
      },
      {
        message: "Enter manager email address: ",
        name: "email",
      },
      {
        message: "Enter manager officeNumber: ",
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
      console.log(organization);
      confirmNewEmployee();
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        message: "Enter engineer name: ",
        name: "name",
      },
      {
        message: "Enter engineer id#: ",
        name: "id",
      },
      {
        message: "Enter engineer email address: ",
        name: "email",
      },
      {
        message: "Enter engineer github: ",
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
      console.log(organization);
      confirmNewEmployee();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        message: "Enter intern name: ",
        name: "name",
      },
      {
        message: "Enter intern id#: ",
        name: "id",
      },
      {
        message: "Enter intern email address: ",
        name: "email",
      },
      {
        message: "Enter intern school: ",
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
      console.log(organization);
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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
