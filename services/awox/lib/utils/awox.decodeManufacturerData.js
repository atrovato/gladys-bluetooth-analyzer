function decodeManufacturerData(peripheralUuid) {
  const peripheral = this.bluetooth.getPeripheral(peripheralUuid);

  const { advertisement = {} } = peripheral;
  const { manufacturerData = [] } = advertisement;
  const dataLength = manufacturerData.length;

  let data;
  if (dataLength <= 8) {
    return {};
  } else if (dataLength < 29) {
    data = manufacturerData;
  } else if (manufacturerData[0] != 96 || manufacturerData[1] != 1) {
    return {};
  } else {
    data = Buffer.alloc(29);
    manufacturerData.copy(data, 0, 0, 2);
    manufacturerData.copy(data, 2, 4, 8);
    data[6] = -63;
    data[7] = -92;
    manufacturerData.copy(data, 8, 2, 4);
    manufacturerData.copy(data, 10, 8, 11);
    manufacturerData.copy(data, 13, 13, 29);
  }

  return { data, model: data.readUInt16LE(8) };
}

module.exports = {
  decodeManufacturerData,
};
