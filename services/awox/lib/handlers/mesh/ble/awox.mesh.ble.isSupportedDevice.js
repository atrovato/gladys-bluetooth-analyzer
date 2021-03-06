const { DEVICE_MODEL_KEYS } = require('./utils/awox.mesh.ble.constants');

/**
 * @description Is the device BLEMesh comptatible?
 * @param {Object} device - Gladys device.
 * @param {Object} manufacturerData - Decoded manufacturer data.
 * @returns {boolean} Is the device compatible?
 * @example
 * bleMesh.isSupportedDevice({ name: 'awox' });
 */
function isSupportedDevice(device, manufacturerData) {
  return Object.values(manufacturerData).find((val) => DEVICE_MODEL_KEYS.includes(val.type));
}

module.exports = {
  isSupportedDevice,
};
