const Inquirer = require("inquirer");
const { log } = require("../log");
const { CommitizenPeignoir } = require("../peignoir/commitizen.peignoir");
const { SemanticReleasePeignoir } = require("../peignoir/semantic-release");

async function semverCheck() {
  const semver = new SemanticReleasePeignoir();

  if (semver.file.exists) {
    log(`Detected Semantic Release`);
    log("");

    const equal = semver.chechIntegrity();

    if (!equal) {
      log(".releaserc.json looks different");
      log("");

      return await Inquirer.prompt({
        message: "Do you want to overide it",
        name: "semverSwap",
        type: "confirm",
        default: false,
      }).then(({ semverSwap }) => semverSwap && semver.overideConfig());
    } else {
      log(".releaserc.json file looks good");
      return true;
    }
  } else {
    return await Inquirer.prompt({
      message: "Semantic Release config not found, init it?",
      type: "confirm",
      default: false,
      name: "init",
    }).then(async ({ init }) => {
      if (init) {
        const enabled = await semver.init();

        if (enabled) {
          return enabled;
        }

        const czEnabled = await new CommitizenPeignoir().init();

        if (czEnabled) {
          return await semver.init();
        }

        return czEnabled;
      }
    });
  }
}

module.exports = { semverCheck };
