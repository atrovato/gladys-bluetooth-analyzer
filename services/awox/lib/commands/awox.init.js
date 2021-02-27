const handlers = require('../handlers');

/**
 * @description Initialize AwoX service by loading Bluetooth service and compatible hanlders.
 * @example
 * awox.init();
 */
function init() {
  this.bluetooth = this.gladys.services.getService('bluetooth');
  this.handlers = handlers.map((handlerClass) => new handlerClass(this.gladys, this.bluetooth));
}

module.exports = {
  init,
};
