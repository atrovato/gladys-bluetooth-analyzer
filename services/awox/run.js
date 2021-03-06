const AwoxManager = require('./lib');
const { exec } = require('./exec');
const { printDevice } = require('../../utils/printer');

const run = async (executor) => {
  const { gladys, result, bluetooth } = executor;
  const { deviceUuid } = result;

  const awox = new AwoxManager(gladys, 'serviceId');
  awox.init();

  const awoxDevice = awox.getDevice(deviceUuid);
  printDevice(awoxDevice);

  return await exec(awox, awoxDevice, bluetooth, deviceUuid);
};

module.exports = {
  run,
};
