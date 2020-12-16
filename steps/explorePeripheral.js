const prompts = require('prompts');
const { printDevice, uuidToMac } = require('../utils/printer');

const explorePeripheral = async (executor) => {
  const { deviceUuid, service } = executor.result;
  executor.startLoading(`Exploring ${uuidToMac(deviceUuid)} device information...`);
  await executor.bluetooth.scanDevice(deviceUuid);
  const device = executor.bluetooth.getDiscoveredDevice(deviceUuid);
  executor.stopLoading();
  printDevice(device);

  return { device };
};

module.exports = {
  explorePeripheral,
};
