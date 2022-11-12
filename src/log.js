const env = require("./env");

const log = (message, { error = false, prefix = "" } = {}) => {
  const msg = prefix + message;

  if (error) {
    console.error(msg);
  } else {
    console.log(msg);
  }
};

const debug = (message, { error = false, prefix = "" } = {}) => {
  if (env.debug) {
    log(message, { error, prefix });
  }
};

module.exports = {
  debug,
  log,
};
