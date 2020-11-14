const prompts = require('prompts');
const colors = require('colors');
const services = require('../services');
const { quit } = require('./quit');

const serviceSelection = async () => {
  const { service } = await prompts([
    {
      type: 'select',
      name: 'service',
      message: 'Select the service you want to test',
      choices: Object.values(services).map((s) => s.description),
    },
  ]);

  // Service analyse execution
  const serviceRunner = services[service];
  if (!serviceRunner) {
    quit(colors.bold.red(`Service ${service} is unknown, this might be a bug!`));
  }

  return serviceRunner;
};

module.exports = {
  serviceSelection,
};
