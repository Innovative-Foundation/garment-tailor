const Inquirer = require("inquirer");
const { GitPeignoir } = require("../peignoir/git");
const { log } = require("../log");

async function gitCheck() {
  const git = new GitPeignoir();

  if (git.file.exists) {
    log(`Detected git`);
    log("");
  } else {
    await Inquirer.prompt({
      message: "Git not found, do you want to init repo?",
      name: "init",
      type: "confirm",
      default: false,
    }).then((init) => init && git.init());
  }

  if (git.gitignore.exists) {
    log(`.gitignore file detected`);
    log("");
  } else {
    // init some .gitignore based on support table
  }
}

module.exports = { gitCheck };
