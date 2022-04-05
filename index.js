// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const {writeFile} = require('./utils/generateFiles.js');
const generateRM = require('./src/readme-template.js');


// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project? '
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
const createFile = response => {
    const {title: fileName, ...answer} = response;
    const fileContent = generateRM(fileName, answer);
    const data = {fileName:fileName, fileContent:fileContent};
    return data;
};

// TODO: Create a function to initialize app
const init = () => {
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
