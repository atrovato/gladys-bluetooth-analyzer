const colors = require('colors');

const { SERVICES, CHARACTERISTICS } = require('./constants');

const readSunlight = async (peripheral) => {
  this.executor.startLoading(`Reading sunlight...`);
  const data = await this.bluetooth.readDevice(peripheral, SERVICES.LIVE, CHARACTERISTICS[SERVICES.LIVE].SUNLIGHT);
  this.executor.stopLoading();

  console.log(colors.gray(data));

  const rawValue = data.readUInt16LE(0) * 1.0;
  const sunlight = 0.08640000000000001 * (192773.17000000001 * Math.pow(rawValue, -1.0606619));
  console.log(colors.bold.green(`Sunlight: ${sunlight} (${rawValue})`));
  return sunlight;
};

module.exports = {
  readSunlight,
};
