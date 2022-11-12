const { cwd } = process;

const { log, debug } = require("../log");
const { npmCheck, gitCheck } = require("../check/checks");

const prefix = "Check | ";

module.exports = (program) => {
  program
    .command("check")
    .description("Check for feature existence")
    .action((args, opts) => {
      log(`Current directory is '${cwd()}'`, { prefix });

      debug("npm check", { prefix });
      npmCheck(prefix);
      debug("git check", { prefix });
      gitCheck(prefix);
    });
};
