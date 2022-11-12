const { UniverseFile } = require("../file");
const { isEqual } = require("lodash");
const { log } = require("../log");
const { NpmPeignoir } = require("./npm");
const { CommitizenPeignoir } = require("./commitizen.peignoir");
const Inquirer = require("inquirer");

class SemanticReleasePeignoir {
  configPath = ".releaserc.json";

  devDeps = [
    "conventional-changelog-conventionalcommits",
    "@semantic-release/changelog",
    "@semantic-release/git",
  ];

  constructor() {
    this.file = new UniverseFile(".releaserc.json");
  }

  chechIntegrity() {
    const fixture = UniverseFile.fixture(this.configPath);
    const file = this.file.read();

    return isEqual(file, fixture);
  }

  overideConfig() {
    this.file.swap(this.configPath);
    return true;
  }

  async installDeps(npm) {
    let err;

    for (let pkg of this.devDeps) {
      const { error } = await npm.install(pkg, true);

      if (error) {
        err = error;
      }
    }

    return err;
  }

  async init() {
    if (this.file.exists) {
      return true;
    } else {
      const commitizen = new CommitizenPeignoir();
      const npm = new NpmPeignoir();

      if (!commitizen.enabled) {
        const enabled = await Inquirer.prompt({
          message: "Commitizen not detected, init it?",
          type: "confirm",
          name: "init",
          default: false,
        }).then(({ init }) => {
          log("");

          if (init) {
            return commitizen.init();
          }

          return init;
        });

        if (!enabled) {
          return false;
        }
      }

      if (this.enabled) {
        return true;
      }

      this.file.swap(this.configPath);
      return await this.installDeps(npm);
    }
  }
}

module.exports = { SemanticReleasePeignoir };
