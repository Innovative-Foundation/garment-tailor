const { UniverseFile } = require("../file");
const { log } = require("../log");

class GitPeignoir {
  constructor() {
    this.gitignore = new UniverseFile(".gitignore");
    this.file = new UniverseFile(".git");
    this.prefix = "Git | ";
  }

  init() {
    if (this.file.exists) {
      log("Git already initialized");
    } else {
      execute("git init");
      // Write node_modules to .gitignore package.json exists
      this.gitignore.init();
    }
  }
}

module.exports = { GitPeignoir };
