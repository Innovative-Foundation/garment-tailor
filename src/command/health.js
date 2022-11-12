const { Command } = require("commander");
const { cwd } = process;

const { npmCheck, gitCheck } = require("../check/checks");
const { log, debug } = require("../log");

module.exports = () => {
  const check = new Command("health").description(
    "Check for feature existence and it state"
  );

  check.action((args, opts) => {
    log(`Current directory is '${cwd()}'`);
    log('');

    debug("npm check");
    npmCheck();
    log('');

    debug("git check");
    gitCheck();
  });

  return check;
};
