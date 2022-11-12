const p = require("path");
const fs = require("fs");
const { debug, log } = require("./log");
const { cwd } = process;

class UniverseFile {
  prefix = "File | ";

  get filePath() {
    return p.join(cwd(), this.path);
  }

  constructor(path) {
    const { prefix } = this;

    debug(`Start looking for '${path}'`, { prefix });

    this.exists = false;
    this.path = path;

    try {
      fs.accessSync(this.filePath);
      debug(`${path} founded`, { prefix });
      this.exists = true;
    } catch (err) {
      debug(`Could not find or access ${path}`, { prefix });
      debug(err, { prefix });
    }
  }

  async init(data = "") {
    const { exists, path, filePath, prefix } = this;

    if (!exists) {
      try {
        fs.writeFileSync(filePath, data);
        debug(`Write' ${path}'`, { prefix });
        this.exists = true;
      } catch (err) {
        log(err, { error: err, prefix });
      }
    } else {
      debug(`'${path}' already exists`, { prefix });
    }

    return;
  }

  static fixture(file) {
    const source = p.resolve(__dirname, "fixture", file);
    return require(source);
  }

  swap(file) {
    const source = p.resolve(__dirname, "fixture", file);
    fs.copyFileSync(source, this.filePath);
  }

  read() {
    debug(`reading ${this.path}`);
    const extension = p.extname(this.path);

    switch (extension) {
      case ".json":
        return require(this.filePath);
      default:
        debug(`'${extension}' is not known extension`);
        break;
    }
  }
}

function readPackageJSON() {
  const file = new UniverseFile("package.json");
  return file.read();
}

module.exports = {
  readPackageJSON,
  UniverseFile,
};
