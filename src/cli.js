#!/usr/bin/env node

const { name, version, description } = require("../package.json");
const { program } = require("commander");
const check = require("./command/check");
const initialize = require("./command/initialize");

class Universe {
  constructor() {
    program.description(description).version(version).name(name);
    initialize(program);
    check(program);
    program.parse();
  }
}

new Universe();
