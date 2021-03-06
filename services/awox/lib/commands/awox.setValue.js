const { DEVICE_PARAMS } = require('../utils/awox.constants');

/**
 * @description Send value to device.
 * @param {String} peripheralUuid - Bluetooth UUID.
 * @param {Object} deviceFeature - Device feature.
 * @param {Number} value - Expected value.
 * @returns {Promise} Promise with send value.
 * @example
 * await awoxLegacy.setValue({ external_id: 'd03975bc5a71' }, { type: 'binary' }, 1);
 */
async function setValue(device, deviceFeature, value) {
  const { params = [], name } = device;
  const typeParam = params.find((p) => p.name === DEVICE_PARAMS.DEVICE_TYPE);

  if (!typeParam) {
    throw new Error(`AwoX: No handler matching device ${name}`);
  }

  return this.handlers[typeParam.value].setValue(device, deviceFeature, value);
}

module.exports = {
  setValue,
};
