const { Argument, Command } = require("commander");

const { GitPeignoir } = require("../peignoir/git");
const { SemanticReleasePeignoir } = require("../peignoir/semantic-release");

const Inquirer = require("inquirer");
const { log } = require("../log");
const { NpmPeignoir } = require("../peignoir/npm");

const QUESTIONS = [
  {
    type: "list",
    name: "peignoir",
    choices: [
      "semantic release",
      "github action",
      "node-cli",
      "angular",
      "node",
      "git",
      "npm",
    ],
    message: "Select feature you want to add or initialize",
  },
];

const action = (feature) => {
  switch (feature) {
    case "git":
      const git = new GitPeignoir();
      return git.init();

    case "npm":
      const npm = new NpmPeignoir();
      return npm.init();

    case "semantic release":
      const sr = new SemanticReleasePeignoir();
      return sr.init();

    default:
      log("not supported yet");
      return;
  }
};

module.exports = () => {
  const argument = new Argument("<peignoir>")
    .argOptional()
    .choices(["git", "npm", "semver"]);

  const command = new Command("add").description(
    "Initialize code from stratch for head start"
  );

  command.action((peignoir) => {
    if (peignoir) {
      action(peignoir);
      log("");
      return;
    }

    Inquirer.prompt(QUESTIONS).then(({ peignoir }) => {
      log("");
      action(peignoir);
      log("");
    });
  });

  return command.addArgument(argument);
};
