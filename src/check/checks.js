const { GitPeignoir } = require("../peignoir/git");
const { NpmPeignoir } = require("../peignoir/npm");
const { log } = require("../log");

const npmCheck = (prefix) => {
  const { name, version, dependencies, bin } = new NpmPeignoir();

  log(`${name} (v${version}) package looks valid`, { prefix });

  if (bin) {
    log("Looks like we have a node cli project here", { prefix });
  }

  if (dependencies && dependencies.length) {
    log(`Found ${Object.keys(dependencies).length} dependencies`, { prefix });
  } else {
    log(`Looks like '${name}' have no dependencies`, { prefix });
  }
};

const gitCheck = (prefix) => {
  const git = new GitPeignoir();

  if (git.file.exists) {
    log(`Git founded`, { prefix });
  } else {
    log(`Git not found`, { prefix });
  }

  if (git.gitignore.exists) {
    log(`.gitignore founded`, { prefix });
  }
};

module.exports = { gitCheck, npmCheck };
