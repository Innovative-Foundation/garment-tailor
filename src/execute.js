const exec = require("util").promisify(require("child_process").exec);

const execute = async (command) => {
  let response = "";
  let error = null;

  try {
    const { stdout, stderr } = await exec(command);

    response = stdout;

    if (stderr) {
      error = stderr;
    }
  } catch ({ stderr }) {
    error = stderr;
  }

  return { response, error };
};

module.exports = { execute };
