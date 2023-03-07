const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee");


//function that creates the development team members, and render the HTML file.
function start () {
    let team = [];
    // function to handle generating manager - first bc we need a manager
    function createManager() {
      //questions to illict manager details
        inquirer.prompt([
            {
              type: "input",
              name: "managerName",
              message: "What is the team manager's name?",
              validate: answer => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the team manager's ID?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "managerEmail",
                message: "What is the team manager's email?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the team manager's office number?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
          ]).then(answers => {
            
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            // push to team array
            team.push(manager);
            // call the next function that will ask what type of employee will be created next
            createTeam();
          })
    }

    // function that asks what type of employee they would like to create next
    function createTeam(){
        inquirer.prompt([
            // question asking which team member should be created next
            {
                type: "list",
                name: "teamMemberChoice",
                message: "Which team member would you like to create?",
                choices:['engineer','intern','None'],
              },
        ]).then(userChoice => {
            /* conditional that decides which of the below functions to call
                based on userChoice. 
                - If none of the choices (engineer or intern) have been chosen then build the team webpage   
            */
            if (userChoice.teamMemberChoice === 'engineer'){
                createEngineer();

            }else if (userChoice.teamMemberChoice === 'intern'){
                createIntern();

            }else {
                //build webpage and write to file;
                fs.writeFileSync(outputPath, render(team), "utf-8");
            }
        })
    }

    // function to handle generating engineer
    function createEngineer() {
        inquirer.prompt([
            {
              //Questions to illict member details.
              type: "input",
              name: "engineerName",
              message: "What is the team engineer's name?",
              validate: answer => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the team engineer's ID?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "engineerEmail",
                message: "What is the team engineer's email?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "engineerGithub",
                message: "What is the team engineer's github username?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
            ]).then(answers => {
            //create engineer object using answers
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            // push object to team array
            team.push(engineer);
            // call the next function that will ask what type of employee will be created next
            createTeam();
          })
    }
    // function to handle generating intern
    function createIntern() {
        inquirer.prompt([
            {
              //Questions to illict member details.
              type: "input",
              name: "internName",
              message: "What is the team intern's name?",
              validate: answer => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              }
            },
            {
                type: "input",
                name: "internId",
                message: "What is the team intern's ID?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "internEmail",
                message: "What is the team intern's email?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "internSchool",
                message: "What is the team intern's school?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
            ]).then(answers => {
            //create intern object using answers
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            // push object to team array
            team.push(intern);
            // call the next function that will ask what type of employee will be created next
            createTeam();
          })
    }
    // function to buildTeam - will use fs.writeFileSync & pass in the outputPath created above, call to render (dont forget to pass in the employee array), & "utf-8"
        
    createManager(); // starts of the whole chain of events. 
}

start();