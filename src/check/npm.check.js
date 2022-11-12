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

  if (npm.bin) {
    log("Looks like we have a node cli project here");
  }

  log(`Npm package ${npm.name} (v${npm.version}) founded`);

  if (npm.dependencies && npm.dependencies.length) {
    log(`Found ${npm.dependencies.length} npm dependencies`);
  } else {
    log(`Looks like '${npm.name}' have no npm dependencies`);
  }

  log("");
}

module.exports = { npmCheck };
