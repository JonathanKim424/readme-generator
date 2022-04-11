const fs = require('fs');
const {marked} = require('marked');

// creates an HTML preview based on the readme text generated
const writeHTML = fileContent => {
    return new Promise((resolve, reject) => {
        const html = marked.parse(fileContent);
        fs.writeFile('./dist/preview.html', html, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'HTML preview created!'
            });
        });
    });
};

// creates the readme file given the raw readme text and assigns the name of the file as the title of the readme project
// then passes raw readme text to writeHTML()
const writeFile = (fileName, fileContent) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/' + fileName + '.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'README created!'
            });
        });
    })
    .then(writeResponse => {
        console.log(writeResponse);
        return writeHTML(fileContent);
    })
    .then(writeResponse => {
        console.log(writeResponse);
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports = {writeFile};