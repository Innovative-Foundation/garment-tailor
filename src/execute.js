const { exec } = require("child_process");
const { log, debug } = require("./log");

const execute = (command) => {
  const prefix = "Execute | ";

  exec(command, (err, message, error) => {
    if (err) {
      log("", { error: err, prefix });
    }

    log(message, { prefix });

    if (error) {
      log("", { error: err, prefix });
    }
  });
};

module.exports = { execute };
