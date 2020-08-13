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
      message: "Describe your project"
    },
    {
      type: "list",
      choices: ["MIT", "GNU", "Apache", "Other", "None"],
      name: "license",
      message: "What licenses are you using for this project"
    },
    {
      type:"input",
      name:"contribute",
      message:"Contribution guidelines for this project",
    },
    {
      type: "input",
      name: "install",
      message: "What are the instructions for installation?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter the URL to your Github page"
    },
    {
      type: "input",
      name: "linked",
      message: "Enter the URL to your LinkedIn."
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

<p>Contributions</p>
${response.contribute}

<p>License</p>
${response.license}
<p>Contributing"</p>

<p>Installation</p>
${response.install}

#<p>Contact Information:
<p>Github</p>
## github.com/${data.linked} 
<p>LinkedIn</p>
**[LinkedIn](${response.linked})**
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

init()