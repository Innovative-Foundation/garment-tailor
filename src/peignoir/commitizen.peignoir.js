const { NpmPeignoir } = require("./npm");

class CommitizenPeignoir {
  devDeps = ["cz-conventional-changelog"];
  enabled = false;
  npm = new NpmPeignoir();

  constructor() {
    const pkg = this.npm.file.read();

    if (pkg.config && pkg.config.commitizen) {
      const preset = pkg.config.commitizen.path;

      // check if preset installed
      this.preset = preset;
      this.enabled = true;
    }
  }

  async init() {
    if (this.enabled) {
      return;
    }

    this.npm.update({
      config: {
        commitizen: {
          path: [this.devDeps[0]],
        },
      },
    });

    return (this.enabled = true);
  }
}

module.exports = { CommitizenPeignoir };
