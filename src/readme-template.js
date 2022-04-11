const {generateMarkdown, renderLicenseBadge} = require('../utils/generateMarkdown.js');

// generates raw text for the readme file creation
// references generateMarkdown.js for the implementation of the license badge and markdown text
module.exports = (fileName, data) => {
    return `
# ${fileName} ${renderLicenseBadge(data.license)}

## Description

${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${data.installation}

## Usage

${data.usage}

## Credits

${data.credits}

## License

${generateMarkdown(data.license)}

## Contributing

${data.contribution}

## Tests

${data.test}

## Questions

GitHub: ${data.github} @ https://github.com/${data.github}

If you have any questions, please reach out to me via email.

${data.email}
    `;
};