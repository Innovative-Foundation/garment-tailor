const Inquirer = require("inquirer");
const { log } = require("../log");
const { SemanticReleasePeignoir } = require("../peignoir/semantic-release");
const { isEqual } = require("lodash");

async function semverCheck() {
  const semver = new SemanticReleasePeignoir();

  if (semver.file.exists) {
    log(`Detected Semantic Release`);
    log("");
    const equal = semver.chechIntegrity();

    if (!equal) {
      log(".releaserc.json looks different");
      log("");

      await Inquirer.prompt({
        message: "Do you want to overide it",
        name: "semverSwap",
        type: "confirm",
        default: false,
      }).then(({ semverSwap }) => semverSwap && semver.overideConfig());
    } else {
      log(".releaserc.json file looks good");
    }
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
