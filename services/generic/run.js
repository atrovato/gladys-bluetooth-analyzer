const prompts = require('prompts');

const { printPeripheral } = require('../../utils/printer');
const { exploreServices } = require('./exploreServices');

const run = async (executor) => {
  const { next } = await prompts([
    {
      type: 'confirm',
      name: 'next',
      message: 'This mode will try to scan your peripheral to get maximum information, continue?',
      initial: 'yes',
    },
  ]);

  if (!next) {
    return { previousStep: true };
  }

  const { bluetooth, result } = executor;
  const { deviceUuid } = result;

  executor.startLoading('Connecting to device...');
  return await bluetooth.applyOnPeripheral(deviceUuid, async (peripheral) => {
    executor.stopLoading();
    await exploreServices(executor, peripheral);
    printPeripheral(peripheral);
    return;
  });
};

module.exports = {
  run,
};
