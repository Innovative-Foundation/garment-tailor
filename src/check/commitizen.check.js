const Inquirer = require("inquirer");
const { log } = require("../log");
const { CommitizenPeignoir } = require("../peignoir/commitizen.peignoir");

async function commitizenCheck() {
  const commitizen = new CommitizenPeignoir();

  if (commitizen.enabled) {
    log(`Detected commitizen with ${commitizen.preset} preset`);
    log("");

    return true;
  } else {
    return false;
  }
}

module.exports = { commitizenCheck };
