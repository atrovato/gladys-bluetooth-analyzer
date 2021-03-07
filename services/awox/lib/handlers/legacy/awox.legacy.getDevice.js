const logger = require('../../../../../utils/logger');
const { DEVICE_MODEL_GROUPS, DEVICE_MODEL_FEATURES } = require('./utils/awox.legacy.constants');

/**
 * @description Transform Bluetooth device to AwoX legacy.
 * @param {String} device - Bluetooth device.
 * @returns {Object} AwoX device
 * @example
 * awoxLegacy.getDevice({ model: 'SML-W7' });
 */
function getDevice(device) {
  const { model, name } = device;
  const key = model || name || '';
  logger.debug(`AwoX - Legacy: getting '${key}' AwoX device...`);

  const deviceGroup = Object.keys(DEVICE_MODEL_GROUPS).find((group) => DEVICE_MODEL_GROUPS[group].includes(key));
  const features = (DEVICE_MODEL_FEATURES[deviceGroup] || []).map((feature) => {
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
