const logger = require('../../../../../../utils/logger');
const { setDeviceParam } = require('../../../../../../utils/setDeviceParam');

const { DEVICE_MODEL_GROUPS, DEVICE_MODEL_FEATURES, DEVICE_MODEL_KEYS } = require('./utils/awox.mesh.ble.constants');
const { DEVICE_PARAMS, DEVICE_TYPES } = require('../../../utils/awox.constants');

/**
 * @description Transform Bluetooth device to AwoX BLEMesh.
 * @param {String} device - Bluetooth device.
 * @returns {Object} AwoX device
 * @example
 * bleMesh.getDevice({ model: 'SML-W7' });
 */
function getDevice(device, manufacturerData) {
  logger.debug(`AwoX - BLEMesh: getting '${device.name}' AwoX device...`);

  const deviceGroup = Object.keys(DEVICE_MODEL_GROUPS).find((group) =>
    DEVICE_MODEL_GROUPS[group].includes(manufacturerData.model),
  );
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
