const { NpmPeignoir } = require("../peignoir/npm");

const Inquirer = require("inquirer");
const { log } = require("../log");

async function npmCheck() {
  const npm = new NpmPeignoir();

  if (!npm.enabled) {
    await Inquirer.prompt({
      message: "Npm package not found, do you want to init package.json?",
      name: "init",
      type: "confirm",
      default: false,
    }).then(({ init }) => init && npm.init());
  }

  log(`Detected npm '${npm.name} v${npm.version}'`);
  log("");

  if (npm.bin) {
    log("Looks like we have a node-cli project here");
  }

  if (npm.dependencies && npm.dependencies.length) {
    log(`Detected ${npm.dependencies.length} dependencies`);
  }

  if (npm.scripts && npm.scripts.length) {
    log(`Detected ${npm.scripts.length} scripts`);
  }

  log("");
}

module.exports = { npmCheck };
