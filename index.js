const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?"
    },
    {
      type: "input",
      name: "describe",
      message: "Describe your project:"
    },
    {
      type: "list",
      choices: ["MIT", "GNU", "Apache", "Other", "None"],
      name: "license",
      message: "What licenses are you using for this project?"
    },
    {
      type:"input",
      name:"contribute",
      message:"Contribution guidelines for this project:",
    },
    {
      type: "input",
      name: "install",
      message: "Instructions for installation"
    },
    {
      type:"input",
      name:"usage",
      message:"Instructions for usage:",
    },
    {
      type: "input",
      name: "github",
      message: "Please enter your Github username"
    },
    {
      type:"input",
      name:"linked",
      message:"Please enter your linked in username",
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email address for contact info"
    }
  ]);
}
function generateMarkdownLang(response) {
  return `
# ${response.title}

<p>Descrption:</p>
${response.describe} 

### Table of Contents
* [Description](#descripe)
* [License](#license)
* [Installation](#install)
* [Usage](#usage)
* [Contributing](#contributing)
* [Testing](#test)
* [Github](#github)
* [linkedin](#linked)

<p>License:</p>
${response.license}

<p>Contributions:</p>
${response.contribute}

<p>Installation</p>
${response.install}

<p>Usage</p>
${response.usage}

#<p>Contact Information:
<p>Github</p>
<a>https.//github.com/${response.github}</a>
<p>LinkedIn</p>
<a>https://www.linkedin.com/in/${response.linked}</a>
<p>email address</p>
(${response.email})
`
}

async function init() {
  try {
      const response = await promptUser();

      const readMe = generateMarkdownLang(response);

      await writeFileAsync("gen_README.md", readMe);
      console.log("Readme file created!");
  } catch (err) {
      console.log(err)
  }
};





// function renderBadge(license){
//   if (license === "Apache") {
//     return ('[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)')
//   } else if (license === "MIT") {
//     return ('[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)')
//   } else if (license === "ISC") {
//     return ('[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)')
//   } else {
//     return ('[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)')
//   };
  

init()