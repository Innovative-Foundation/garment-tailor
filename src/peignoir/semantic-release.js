const { UniverseFile } = require("../file");
const { log } = require("../log");

class SemanticReleasePeignoir {
  constructor() {
    this.file = new UniverseFile(".releaserc.json");
  }

  init() {
    if (this.file.exists) {
      log("Semantic release already initialized");
    } else {
      // check commitizen support
      // install semver dev deps
      this.file.swap(".releaserc.json");
      log("Semantic release initialized");
    }
  }
}

module.exports = { SemanticReleasePeignoir };
