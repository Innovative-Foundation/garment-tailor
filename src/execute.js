const exec = require("util").promisify(require("child_process").exec);
const { log, debug } = require("./log");

const execute = async (command) => {
  try {
    const { stdout, stderr } = await exec(command);

    log(stdout);

    if (stderr) {
      log("", { error: stderr });
    }
  } catch ({ stderr }) {
    log("", { error: stderr });
  }
};

module.exports = { execute };
