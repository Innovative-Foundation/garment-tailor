const { Command } = require("commander");

const { npmCheck, gitCheck, semverCheck } = require("../check");

module.exports = () => {
  const check = new Command("health")
    .description("Check for feature existence and it state")
    .action(async () => {
      await gitCheck();
      await npmCheck();
      await semverCheck();
    });

  return check;
};
