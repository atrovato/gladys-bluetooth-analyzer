const { init } = require('./commands/awox.init');
const { setValue } = require('./commands/awox.setValue');
const { isSupportedDevice } = require('./commands/awox.isSupportedDevice');
const { getDevice } = require('./commands/awox.getDevice');

const AwoxManager = function AwoxManager(gladys, serviceId) {
  this.gladys = gladys;
  this.serviceId = serviceId;
  this.bluetooth = undefined;
  this.handlers = [];
};

AwoxManager.prototype.init = init;
AwoxManager.prototype.setValue = setValue;
AwoxManager.prototype.isSupportedDevice = isSupportedDevice;
AwoxManager.prototype.getDevice = getDevice;

module.exports = AwoxManager;
