const { NotFoundError } = require('../../../../utils/coreErrors');
const { setDeviceParam } = require('../../../../utils/setDeviceParam');
const { DEVICE_PARAMS } = require('../utils/awox.constants');
const { generateFeature } = require('../utils/awox.features');

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

  const manufacturerData = this.decodeManufacturerData(peripheralUuid);
  const awoxType = Object.keys(this.handlers).find((type) =>
    this.handlers[type].isSupportedDevice(device, manufacturerData),
  );
  if (!awoxType) {
    throw new Error(`AwoX: No handler matching device ${peripheralUuid}`);
  }

  const awoxDeviceTemplate = this.handlers[awoxType].getDevice(device, manufacturerData);
  const deviceFeatures = awoxDeviceTemplate.features.map((feature) => generateFeature(feature, device.external_id));

  const awoxDevice = { ...awoxDeviceTemplate, features: deviceFeatures };
  setDeviceParam(awoxDevice, DEVICE_PARAMS.DEVICE_TYPE, awoxType);
  return awoxDevice;
}

module.exports = {
  getDevice,
};
