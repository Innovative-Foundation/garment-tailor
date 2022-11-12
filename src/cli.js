#!/usr/bin/env node

const { name, version, description } = require("../package.json");
const { program } = require("commander");
const health = require("./command/health");
const add = require("./command/add");
const { log } = require("./log");

class Universe {
  constructor() {
    program
      .addCommand(health())
      .addCommand(add())
      .description(description)
      .version(version)
      .name(name);

    log("");
    program.parse();
    log("");
  }
}

new Universe();
