const logger = require('../../../../utils/logger');

function decodeManufacturerData(peripheralUuid) {
  const peripheral = this.bluetooth.getPeripheral(peripheralUuid);

  if (!peripheral) {
    return {};
  }

  const { advertisement = {} } = peripheral;
  const { manufacturerData = [] } = advertisement;

  const dataLength = manufacturerData.length;
  let i = 0;
  let b;
  let result = {};

  while (i < dataLength) {
    b = manufacturerData[i];

    if (b === 0) {
      break;
    }

    let i2 = i + b;
    if (i2 < dataLength) {
      let b2 = manufacturerData[i + 1];

      if (b2 != -1 || result[b2] === undefined || result[b2].data.length <= b - 1) {
        let i3 = b - 1;
        const subData = Buffer.allocUnsafe(i3);
        manufacturerData.copy(subData, i + 2, 0, i3);
        result[b2] = { length: b, type: b2, data: subData };
      }
    } else {
      i2 = i;
    }

    i = i2 + 1;
  }

  logger.debug(`AwoX: ${peripheralUuid} decoded manufacturer data`, manufacturerData, result);

  return result;
}

module.exports = {
  decodeManufacturerData,
};
