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
  const handler = this.handlers.find((h) => h.isSupportedDevice(device));

  if (!handler) {
    throw new Error(`AwoX: No handler matching device ${device.name}`);
  }

  return handler.setValue(device, deviceFeature, value);
}

module.exports = {
  setValue,
};
