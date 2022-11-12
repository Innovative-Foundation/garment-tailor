const { UniverseFile } = require("../file");
const { isEqual } = require("lodash");
const { log } = require("../log");
const { NpmPeignoir } = require("./npm");

class SemanticReleasePeignoir {
  configPath = ".releaserc.json";

  devDeps = [
    "conventional-changelog-conventionalcommits",
    "cz-conventional-changelog",
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
  }

  async installDeps(npm) {
    // check if already installed

    log("Installing semver dev deps");

    for (let pkg of this.devDeps) {
      const { error } = await npm.install(pkg, true);

      if (!error) {
        log(`${pkg} installed sucesfully`);
      }
    }
    log("");
  }

  async init() {
    if (this.file.exists) {
      log("Semantic release already initialized");
    } else {
      const npm = new NpmPeignoir();
      // check commitizen support

      this.file.swap(this.configPath);
      log("Semantic release initialized");
      log("");

      log("configure comimitizen in package.json");

      npm.update({
        config: {
          commitizen: {
            path: "cz-conventional-changelog",
          },
        },
      });

      log("package.json updated sucessfully");

      await this.installDeps(npm);
      log("Semantic release is all set :)");
      log("");
    }
  }
}

module.exports = { SemanticReleasePeignoir };
