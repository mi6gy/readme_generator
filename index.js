const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project"
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
${response.tile}

${response.describe}

${response.license}

${response.install}

${response.github}

${response.linked}
`
}

async function init() {
  try {
      const responce = await promptUser();

      const readMe = generateMarkdownLang(response);

      await writeFileAsync("README.md", readMe);
      console.log("Readme file created!");
  } catch (err) {
      console.log(err)
  }
};

init()