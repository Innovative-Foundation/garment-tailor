const Inquirer = require("inquirer");
const { log } = require("../log");
const { SemanticReleasePeignoir } = require("../peignoir/semantic-release");

async function semverCheck() {
  const semver = new SemanticReleasePeignoir();

  if (semver.file.exists) {
    log(`Semantic Release config file founded`);
  } else {
    await Inquirer.prompt({
      message: "Semantic Release config not found, do you want to init repo?",
      name: "init",
      type: "confirm",
      default: false,
    }).then(({ init }) => init && semver.init());
  }
  log("");
}

module.exports = { semverCheck };
