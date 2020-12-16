const colors = require('colors');

const { SERVICES, CHARACTERISTICS } = require('./constants');

const readSoilTemperature = async (peripheral) => {
  this.executor.startLoading(`Reading soil temperature...`);
  const data = await this.bluetooth.readDevice(
    peripheral,
    SERVICES.LIVE,
    CHARACTERISTICS[SERVICES.LIVE].SOIL_TEMPERATURE,
  );
  this.executor.stopLoading();

  console.log(colors.gray(data));

  const rawValue = data.readUInt16LE(0) * 1.0;
  const temperature =
    0.00000003044 * Math.pow(rawValue, 3.0) -
    0.00008038 * Math.pow(rawValue, 2.0) +
    rawValue * 0.1149 -
    30.449999999999999;
  console.log(colors.bold.green(`Soil temperature: ${temperature} (${rawValue})`));
  return temperature;
};

module.exports = {
  readSoilTemperature,
};
