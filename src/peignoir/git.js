const { execute } = require("../execute");
const { UniverseFile } = require("../file");
const { log } = require("../log");

class GitPeignoir {
  tips = [
    {
      links: [""],
      content:
        "You need to set GITHUB_TOKEN (for github action, and to publish release) generate it please go to",
    },
  ];

  constructor() {
    this.gitignore = new UniverseFile(".gitignore");
    this.file = new UniverseFile(".git");
  }

  async init() {
    if (this.file.exists) {
      log("Git already initialized");
    } else {
      await execute("git init");
      // Write node_modules to .gitignore package.json exists
      await this.gitignore.init();
    }
  }
}

module.exports = { GitPeignoir };
