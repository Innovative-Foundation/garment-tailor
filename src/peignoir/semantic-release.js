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
    const commitizen = new CommitizenPeignoir();

    if (!this.file.exists) {
      const npm = new NpmPeignoir();

      const enabled = await Inquirer.prompt({
        message: "Commitizen not detected, init it?",
        type: "confirm",
        name: "init",
        default: false,
      }).then(async ({ init }) => {
        log("");

        if (init) {
          const comm = await commitizen.init();

          return { response: "cz-created" };
        }

        return { response: "cz-dont-exist" };
      });

      if (!commitizen.enabled) {
        if (
          enabled.response === "cz-dont-exist" ||
          enabled.response === "cz-created"
        ) {
          return enabled;
        }
      }

      this.file.swap(this.configPath);
      return await this.installDeps(npm).then(() => ({
        response: "semver-created",
      }));
    }

    return { response: "exists" };
  }
}

module.exports = { SemanticReleasePeignoir };
