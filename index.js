// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const {writeFile} = require('./utils/generateFiles.js');
const generateRM = require('./src/readme-template.js');


// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project? (Required) ',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter a title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a short description of your project: '
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the steps required to install your project? '
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions and examples for use: '
    },
    {
        type: 'input',
        name: 'credits',
        message: 'List your collaborators, if any, with links to their GitHub profiles.'
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Provide contribution guidelines.'
    },
    {
        type: 'input',
        name: 'test',
        message: 'Provide test instructions/examples'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select license',
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense', 'No License']
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email?'
    }
];

// TODO: Create a function to write README file
// obtains output from inquirer.prompt(questions)
// destructures data and sends to generateRM to create raw text for readme
const createFile = response => {
    const {title: fileName, ...answer} = response;
    const fileContent = generateRM(fileName, answer);
    const data = {fileName:fileName, fileContent:fileContent};
    return data;
};

// TODO: Create a function to initialize app
const init = () => {
    console.log('Respond to the following prompts to generate a readme file.');
    console.log('The project title is required, but the rest of the prompts can be left blank to generate a template.');
    console.log('The readme will be generated in the /dist folder using the project title as the name.');
    console.log('Additionally a HTML file will be generated to provide a preview of the readme.');
    // runs inquirer given the questions array created above
    // sends results to createFile()
    // destructures output from createFile then sends to writeFile() from generateFiles.js in /utils
    return inquirer.prompt(questions)
        .then(createFile)
        .then(data => {
            const {fileName, fileContent} = data;
            return writeFile(fileName, fileContent);
        })
        .catch(err => {
            console.log(err);
        });
};

// Function call to initialize app
init();
