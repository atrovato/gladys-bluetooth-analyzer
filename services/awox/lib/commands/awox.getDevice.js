const { NotFoundError } = require('../../../../utils/coreErrors');

/**
 * @description Get device from Bluetooth service and adapt it as AwoX device.
 * @param {String} peripheralUuid - Bluetooth device uuid.
 * @example
 * awox.getDevice('d03975bc5a71');
 */
function getDevice(peripheralUuid) {
  const device = this.bluetooth.getDiscoveredDevice(peripheralUuid);
  if (!device) {
    throw new NotFoundError(`AwoX: No Bluetooth ${peripheralUuid} device found`);
  }

  const handler = this.handlers.find((h) => h.isSupportedDevice(device));
  if (!handler) {
    throw new Error(`AwoX: No handler matching device ${device.external_id}`);
  }

  return handler.getDevice(device);
}

module.exports = {
  getDevice,
};
