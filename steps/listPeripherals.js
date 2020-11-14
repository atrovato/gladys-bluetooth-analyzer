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
    quit(colors.bold.red('No Bluetooth devices detected!'));
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
    quit();
  }

  return device;
};

module.exports = {
  listPeripherals,
};
