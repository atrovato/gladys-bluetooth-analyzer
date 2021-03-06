const logger = require('../../../../../utils/logger');
const { DEVICE_PARAMS, DEVICE_TYPES } = require('./../../utils/awox.constants');
const { DEVICE_MODEL_FEATURES } = require('./utils/awox.legacy.constants');
/**
 * @description Transform Bluetooth device to AwoX legacy.
 * @param {String} device - Bluetooth device.
 * @returns {Object} AwoX device
 * @example
 * awoxLegacy.getDevice({ model: 'SML-W7' });
 */
function getDevice(device) {
  const { model, name } = device;
  const key = model || name;
  logger.debug(`AwoX - Legacy: getting '${key}' AwoX device...`);

  const features = (DEVICE_MODEL_FEATURES[key] || []).map((feature) => {
    return { ...feature };
  });

  return {
    ...device,
    features,
  };
}

module.exports = {
  getDevice,
};
