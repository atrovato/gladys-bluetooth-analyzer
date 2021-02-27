/**
 * @description Loop over available hanlders to check if device is supported by AwoX.
 * @param {Object} device - Gladys device.
 * @returns {boolean} Is the device compatible?
 * @example
 * awox.isSupportedDevice({ name: 'awox' });
 */
function isSupportedDevice(device) {
  return this.handlers.some((handler) => handler.isSupportedDevice(device));
}

module.exports = {
  isSupportedDevice,
};
