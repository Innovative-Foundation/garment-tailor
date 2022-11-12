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
    const { version, name, dependencies, bin, scripts } = readPackageJSON();

    this.dependencies = dependencies && Object.keys(dependencies);

    this._scripts = scripts;
    this.scripts = scripts && Object.keys(scripts);
    this.version = version;
    this.enabled = true;
    this.name = name;
    this.bin = bin;
  }

  async run(script) {
    if (this.enabled) {
      log("Spawning process is not yet supported");
      // await execute(`npm run ${this._scripts[script]}`);
    }
  }

  async install(pkg) {
    // check if there is node_modules in .gitignore
    if (this.enabled) {
      await execute(`npm install --save ${pkg}`);
    }
  }

  async remove(pkg) {
    if (this.enabled) {
      await execute(`npm remove --save ${pkg}`);
    }
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
