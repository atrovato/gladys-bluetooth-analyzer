const prompts = require('prompts');
const colors = require('colors');

const services = require('../services');
const { uuidToMac } = require('../utils/printer');
const { quit } = require('./quit');

const deviceLabel = (executor, mac, device) => {
  const { name } = device;

  const displayInfo = [];
  displayInfo.push(mac);

  if (mac !== name) {
    displayInfo.push(name);
  }

  const matchingServices = Object.values(services)
    .filter((s) => typeof s.match === 'function')
    .filter((s) => s.match(device, executor.gladys))
    .map((s) => s.description.title);

  if (matchingServices.length > 0) {
    displayInfo.push(`[${matchingServices.join(', ')}]`);
  }

  return displayInfo.join(' - ');
};

const listPeripherals = async (executor) => {
  const deviceKeys = Object.keys(executor.bluetooth.discoveredDevices);

  const devices = deviceKeys.map((deviceKey) => {
    const device = executor.bluetooth.discoveredDevices[deviceKey];
    return {
      title: deviceLabel(executor, uuidToMac(deviceKey), device),
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
