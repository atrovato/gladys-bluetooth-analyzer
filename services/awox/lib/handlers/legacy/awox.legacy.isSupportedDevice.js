const { DEVICE_MODELS } = require('./utils/awox.legacy.constants');

/**
 * @description Is the device legacy comptatible?
 * @param {Object} device - Gladys device.
 * @returns {boolean} Is the device compatible?
 * @example
 * legacy.isSupportedDevice({ name: 'awox' });
 */
function isSupportedDevice(device) {
  const { model, name } = device;
  return DEVICE_MODELS.includes(model || name);
}

module.exports = {
  isSupportedDevice,
};
