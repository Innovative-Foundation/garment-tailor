const { Command } = require("commander");

const { npmCheck, gitCheck, semverCheck } = require("../check");
const { commitizenCheck } = require("../check/commitizen.check");
const { log } = require("../log");

module.exports = () => {
  const check = new Command("health")
    .description("Check for feature existence and it state")
    .action(async () => {
      await gitCheck();
      await npmCheck();
      const enabled = await commitizenCheck();

      if (enabled) {
        await semverCheck();
      } else {
        log("Semantic release require commitizen friendly project");
      }

      log("");
    });

  return check;
};
