const prompts = require('prompts');
const colors = require('colors');
const { quit } = require('./quit');

const uuidToMac = (uuid) => {
  return uuid.match(/.{1,2}/g).join(':');
};

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
      value: device,
    };
  });

  if (!devices.length) {
    console.log(colors.bold.red('No Bluetooth devices detected!'));
    return { previousStep: true };
  }

  const { device } = await prompts([
    {
      type: 'select',
      name: 'device',
      message: 'Select device you want to analyse:',
      choices: devices,
    },
  ]);

  if (!device) {
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

  return device;
};

module.exports = {
  listPeripherals,
};
