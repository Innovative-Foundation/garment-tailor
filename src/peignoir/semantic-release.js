const { UniverseFile } = require("../file");
const { isEqual } = require("lodash");
const { log } = require("../log");

class SemanticReleasePeignoir {
  configPath = ".releaserc.json";
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

  installDeps() {
    log('install')
  }

  init() {
    if (this.file.exists) {
      log("Semantic release already initialized");
    } else {
      // check commitizen support
      
      // this.file.swap(this.configPath);
      log("Semantic release initialized");

      this.installDeps();
    }
  }
}

module.exports = { SemanticReleasePeignoir };
