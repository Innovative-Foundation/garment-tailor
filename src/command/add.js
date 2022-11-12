const { Argument, Command } = require("commander");

const { GitPeignoir } = require("../peignoir/git");
const { SemanticReleasePeignoir } = require("../peignoir/semantic-release");

const Inquirer = require("inquirer");
const { log } = require("../log");
const { NpmPeignoir } = require("../peignoir/npm");
const { CommitizenPeignoir } = require("../peignoir/commitizen.peignoir");

const ADD_CHOICES = ["commitizen", "semver", "git", "npm"];

const ADD_QUESTIONS = [
  {
    type: "list",
    name: "peignoir",
    choices: ADD_CHOICES,
    message: "Select feature you want to add or initialize",
  },
];

const addAction = async (feature) => {
  switch (feature) {
    case "semver":
      return await new SemanticReleasePeignoir().init();

    case "commitizen":
      return await new CommitizenPeignoir().init();

    case "npm":
      return await new NpmPeignoir().init();

    case "git":
      return await new GitPeignoir().init();

    default:
      return false;
  }
};

module.exports = () => {
  const argument = new Argument("<peignoir>")
    .argOptional()
    .choices(ADD_CHOICES);

  const command = new Command("add").description(
    "Initialize code from stratch for head start"
  );

  command.action(async (peignoir) => {
    if (peignoir) {
      const success = await addAction(peignoir);

      if (success) {
        log(`Succesfully initialized ${peignoir}`);
      } else {
        log(`Aborted initializing ${peignoir}`);
      }

      log("");
      return;
    }

    Inquirer.prompt(ADD_QUESTIONS).then(async ({ peignoir }) => {
      log("");
      const success = await addAction(peignoir);

      if (success) {
        log(`Succesfully initialized ${peignoir}`);
      } else {
        log(`Aborted initializing ${peignoir}`);
      }
      log("");
    });
  });

  return command.addArgument(argument);
};
