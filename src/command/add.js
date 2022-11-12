const { Argument, Command } = require("commander");

const { GitPeignoir } = require("../peignoir/git");
const { SemanticReleasePeignoir } = require("../peignoir/semantic-release");

module.exports = () => {
  const argument = new Argument("<peignoir>").choices(["git", "semver"]);
  const command = new Command("add").description(
    "Initialize code from stratch for head start"
  );

  command.action((args, opts) => {
    switch (args) {
      case "git":
        const git = new GitPeignoir();

        git.init();
        break;
    }
    switch (args) {
      case "semver":
        const sr = new SemanticReleasePeignoir();

        sr.init();
        break;
    }
  });

  return command.addArgument(argument);
};
