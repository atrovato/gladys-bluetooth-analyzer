const colors = require('colors');

const quit = (message = colors.bold.red('Bye!')) => {
  console.log(message);
  process.exit(0);
};

module.exports = {
  quit,
};
