const { execute } = require("../execute");
const { UniverseFile } = require("../file");
const { log } = require("../log");

class NpmPeignoir {
  dependencies = [];
  enabled = false;
  version = null;
  name = null;
  bin = null;

  constructor() {
    this.file = new UniverseFile("package.json");

    const { version, name, dependencies, bin, scripts } = this.file.read();

    this._scripts = scripts;

    this.dependencies = dependencies && Object.keys(dependencies);
    this.scripts = scripts && Object.keys(scripts);
    this.version = version;
    this.enabled = true;
    this.name = name;
    this.bin = bin;
  }

  async update(map) {
    const pkg = this.file.read();
    const newPkg = Object.assign(pkg, map);

    await this.file.update(JSON.stringify(newPkg, null, 2));
  }

  async run(script) {
    if (this.enabled) {
      log("Spawning process is not yet supported");
      // await execute(`npm run ${this._scripts[script]}`);
    }
  }

  //TODO start-server-and-test for cypress
  async install(pkg, dev = false) {
    // check if there is node_modules in .gitignore
    if (this.enabled) {
      return await execute(`npm install ${dev ? "-D" : "--save"} ${pkg}`);
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
