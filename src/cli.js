#!/usr/bin/env node

const { name, version, description } = require("../package.json");
const { program } = require("commander");
const health = require("./command/health");
const add = require("./command/add");
const inquirer = require("inquirer");
const { log } = require("./log");

class Universe {
  constructor() {
    program
      .addCommand(health())
      .addCommand(add())
      .description(description)
      .version(version)
      .name(name)
      .action(async (args) => {
        await inquirer
          .prompt({
            message: "What do you want to do?",
            choices: ["health", "add"],
            name: "choice",
            type: "list",
          })
          .then(({ choice }) => {
            switch (choice) {
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
