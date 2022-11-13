const { Argument, Command } = require("commander");
const Inquirer = require("inquirer");
const { log } = require("../log");

const { NpmPeignoir } = require("../peignoir/npm");

const npmChoices = ["run", "install", "remove"];

module.exports = () => {
  const npm = new NpmPeignoir();
  const argument = new Argument("action").argOptional().choices(npmChoices);
  const command = new Command("npm").description("speedup npm usage");

  command.action(async () => {
    const { action } = await Inquirer.prompt([
      {
        message: "Select feature you want to add or initialize",
        choices: npmChoices,
        name: "action",
        type: "list",
      },
    ]);

    log("");

    switch (action) {
      case "run":
        const { script } = await Inquirer.prompt({
          message: "",
          type: "list",
          choices: npm.scripts,
          name: "script",
        });

        log("");

        await npm.run(script);
        break;

      case "install":
        const { dev } = await Inquirer.prompt({
          message: "Install as developer dependencies?",
          type: "confirm",
          default: false,
          name: "dev",
        });

        const { package } = await Inquirer.prompt({
          message: `npm install ${ dev ? '-D' : '--save'}`,
          type: "input",
          name: "package",
        });

        log("");

        await npm.install(package, dev);
        break;

      case "remove":
        const { pkg } = await Inquirer.prompt({
          message: "npm remove --save",
          type: "input",
          name: "pkg",
        });

        log("");

        await npm.remove(pkg);
        break;
    }

    log("");
  });

  return command.addArgument(argument);
};
