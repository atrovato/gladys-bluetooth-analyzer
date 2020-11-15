const prompts = require('prompts');
const colors = require('colors');

const { uuidToMac } = require('../utils/printer');
const { quit } = require('./quit');

const deviceLabel = (mac, name) => {
  if (mac === name) {
    return mac;
  }

  return `${mac} - ${name}`;
};

const listPeripherals = async (executor) => {
  const deviceKeys = Object.keys(executor.bluetooth.discoveredDevices);

  const devices = deviceKeys.map((deviceKey) => {
    const device = executor.bluetooth.discoveredDevices[deviceKey];
    return {
      title: deviceLabel(uuidToMac(deviceKey), device.name),
      value: deviceKey,
    };
  });

  if (!devices.length) {
    console.log(colors.bold.red('No Bluetooth devices detected!'));
    return { previousStep: true };
  }

  const { deviceUuid } = await prompts([
    {
      type: 'select',
      name: 'deviceUuid',
      message: 'Select device you want to analyse:',
      choices: devices,
    },
  ]);

  if (!deviceUuid) {
    const { previousStep } = await prompts([
      {
        type: 'confirm',
        name: 'previousStep',
        message: 'Your device is not here, do you want to scan again?',
      },
    ]);

    if (previousStep) {
      return { previousStep };
    } else {
      quit();
    }
  }

  return { deviceUuid };
};

module.exports = {
  listPeripherals,
};
