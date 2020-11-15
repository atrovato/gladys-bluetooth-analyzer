const prompts = require('prompts');
const { quit } = require('./quit');

const scanPeripherals = async (executor) => {
  const { scan } = await prompts([
    {
      type: 'text',
      name: 'scan',
      message: 'Next step is scanning for Bluetooth devices, continue?',
      initial: 'yes',
    },
  ]);

  if (!scan) {
    quit();
  }

  executor.startLoading('Scanning for devices...');
  await executor.bluetooth.scan(true);
  executor.stopLoading();
  return;
};

module.exports = {
  scanPeripherals,
};
