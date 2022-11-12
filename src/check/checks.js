const { GitPeignoir } = require("../peignoir/git");
const { NpmPeignoir } = require("../peignoir/npm");
const { log } = require("../log");

const npmCheck = () => {
  const { name, version, dependencies, bin } = new NpmPeignoir();

  log(`${name} (v${version}) package looks valid`);

  if (bin) {
    log("Looks like we have a node cli project here");
  }

  if (dependencies && dependencies.length) {
    log(`Found ${Object.keys(dependencies).length} npm dependencies`);
  } else {
    log(`Looks like '${name}' have no npm dependencies`);
  }
};

const gitCheck = () => {
  const git = new GitPeignoir();

  if (git.file.exists) {
    log(`Git founded`);
  } else {
    log(`Git not found`);
  }

  if (git.gitignore.exists) {
    log(`.gitignore founded`);
  }
};

module.exports = { gitCheck, npmCheck };
