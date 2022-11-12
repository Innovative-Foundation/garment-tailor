#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer");
const { name, version, description } = require("../package.json");
const health = require("./command/health");
const add = require("./command/add");
const npm = require("./command/npm");
const { log } = require("./log");

class Universe {
  constructor() {
    program
      .addCommand(npm())
      .addCommand(health())
      .addCommand(add())
      .description(description)
      .version(version)
      .name(name)
      .action(async (args) => {
        await inquirer
          .prompt({
            message: "What do you want to do?",
            choices: ["npm", "health", "add"],
            name: "choice",
            type: "list",
          })
          .then(({ choice }) => {
            switch (choice) {
              case "npm":
                log("");
                return npm().parse();

              case "health":
                log("");
                return health().parse();

              case "add":
                log("");
                return add().parse();
            }
          });
      });

    log("");
    program.parse();
  }
}

new Universe();
