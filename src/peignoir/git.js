const { UniverseFile } = require("../file");
const { debug, log } = require("../log");

class GitPeignoir {
  constructor() {
    this.gitignore = new UniverseFile(".gitignore");
    this.file = new UniverseFile(".git");
    this.prefix = "Git | ";
  }

  init() {
    const { prefix } = this;

    log("init", { prefix: this.prefix });

    if (this.file.exists) {
      log("already initialized", { prefix });
    } else {
      execute("git init");
      // Write node_modules to .gitignore package.json exists
      this.gitignore.init();
    }
  }
}

module.exports = { GitPeignoir };
