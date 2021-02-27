const AwoxManager = require('./lib');

module.exports = {
  match: (device, gladys) => {
    const awox = new AwoxManager(gladys);
    awox.init();
    return awox.isSupportedDevice(device);
  },
};
