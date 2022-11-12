const { execute } = require("../execute");
const { readPackageJSON } = require("../file");
const { log } = require("../log");

class NpmPeignoir {
  dependencies = [];
  enabled = false;
  version = null;
  name = null;
  bin = null;

  constructor() {
    const { version, name, dependencies, bin } = readPackageJSON();

    this.dependencies = dependencies && Object.keys(dependencies);
    this.version = version;
    this.enabled = true;
    this.name = name;
    this.bin = bin;
  }

  async init() {
    if (this.enabled) {
      log("Package.json already initialized");
    } else {
      await execute("npm init --yes");
      // Write node_modules to .gitignore if it exists
    }
  }
}

module.exports = { NpmPeignoir };
