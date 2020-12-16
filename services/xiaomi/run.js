const prompts = require('prompts');

const LYWSD03MMC = require('./LYWSD03MMC');
const FlowerCare = require('./FlowerCare');

const MODELS = [LYWSD03MMC, FlowerCare];

const run = async (executor) => {
  const { model } = await prompts([
    {
      type: 'select',
      name: 'model',
      message: 'Select model you want to check:',
      choices: MODELS.map((model) => {
        return {
          title: model.NAME,
          value: model,
        };
      }),
    },
  ]);

  if (!model) {
    const { previousStep } = await prompts([
      {
        type: 'confirm',
        name: 'previousStep',
        message: "You didn't select any device model, do you want to select another device?",
      },
    ]);

    if (previousStep) {
      return { previousStep };
    } else {
      quit();
    }
  }

  const { bluetooth, result } = executor;
  const { deviceUuid } = result;

  executor.startLoading('Connecting to device...');
  return await bluetooth.applyOnPeripheral(deviceUuid, (peripheral) => {
    executor.stopLoading();
    return model.run(peripheral, executor);
  });
};

module.exports = {
  run,
};
