const { readPackageJSON } = require("../file");

class NpmPeignoir {
  constructor() {
    const { version, name, dependencies, bin } = readPackageJSON();

    this.dependencies = Object.keys(dependencies);
    this.version = version;
    this.name = name;
    this.bin = bin;
  }
}

module.exports = { NpmPeignoir };
