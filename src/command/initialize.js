const { Option } = require("commander");

const { GitPeignoir } = require("../peignoir/git");

module.exports = (program) => {
  program
    .command("init")
    .description("Initialize code from stratch for head start")
    .addOption(new Option("-t, --template <templateType>").choices(["git"]))

    .action((args, opts) => {
      const git = new GitPeignoir();

      git.init();
    });
};
