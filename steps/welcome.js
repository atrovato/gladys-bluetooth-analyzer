const prompts = require('prompts');
const { quit } = require('./quit');

const welcome = async () => {
  const { start } = await prompts([
    {
      type: 'confirm',
      name: 'start',
      message: 'This tools is used to test your Bluetooth device with Gladys, do you want to continue?',
      initial: 'yes',
    },
  ]);

  if (!start) {
    quit();
  }

  return;
};

module.exports = {
  welcome,
};
