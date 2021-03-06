const handlers = require('../handlers');

/**
 * @description Initialize AwoX service by loading Bluetooth service and compatible hanlders.
 * @example
 * awox.init();
 */
function init() {
  this.bluetooth = this.gladys.services.getService('bluetooth');
  Object.keys(handlers).forEach(
    (awoxType) => (this.handlers[awoxType] = new handlers[awoxType](this.gladys, this.bluetooth)),
  );
}

module.exports = {
  init,
};
