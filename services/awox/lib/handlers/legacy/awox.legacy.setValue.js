const logger = require('../../../../../utils/logger');
const { BLUETOOTH } = require('./utils/awox.legacy.constants');
const { command } = require('./utils/awox.legacy.command');
const { buildPacket } = require('./utils/awox.legacy.buildPacket');

/**
 * @description Send command to AwoX legacy device over Bluetooth.
 * @param {Object} device - Gladys device.
 * @param {Object} deviceFeature - Device feature.
 * @param {Number} value - Expected value.
 * @returns {Promise} Promise with send value.
 * @example
 * await awoxLegacy.setValue({ external_id: 'bluetooth:d03975bc5a71' }, { type: 'binary' }, 1);
 */
async function setValue(device, deviceFeature, value) {
  const [, peripheralUuid] = device.external_id.split(':');
  logger.debug(`AwoX - Legacy: setting '${peripheralUuid}' device ${deviceFeature.type} with value = ${value}...`);

  const { code, message } = command(deviceFeature, value);
  const packet = buildPacket(code, message);
  logger.debug(`AwoX - Legacy: set device value { code: ${code}, message: ${message} } = ${packet}`);

  return this.bluetooth.applyOnPeripheral(peripheralUuid, (peripheral) => {
    return this.bluetooth.writeDevice(peripheral, BLUETOOTH.SERVICE_ID, BLUETOOTH.CHARACTERISTIC_ID, packet);
  });
}

module.exports = {
  setValue,
};
