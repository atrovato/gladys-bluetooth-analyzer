const prompts = require('prompts');
const colors = require('colors');
const { printSummary } = require('../utils/printer');
const { quit } = require('./quit');

const summary = async (executor) => {
  const { success } = await prompts([
    {
      type: 'confirm',
      name: 'success',
      message: 'Did your analyse ends with success?',
      initial: 'yes',
    },
  ]);

  if (!success) {
    console.log(colors.bold.red('Please try again.'));
  } else {
    console.log(colors.bold.green('HURRAY!!!'));
    console.log(
      colors.green(
        'Please give back following data on https://github.com/atrovato/gladys-bluetooth-analyzer/issues GitHub issues:',
      ),
    );
    printSummary(executor.result);
  }

  quit();
};

module.exports = {
  summary,
};
