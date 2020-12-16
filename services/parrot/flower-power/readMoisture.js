const colors = require('colors');

const { SERVICES, CHARACTERISTICS } = require('./constants');

const readMoisture = async (peripheral) => {
  this.executor.startLoading(`Reading moisture...`);
  const data = await this.bluetooth.readDevice(peripheral, SERVICES.LIVE, CHARACTERISTICS[SERVICES.LIVE].MOISTURE);
  this.executor.stopLoading();

  console.log(colors.gray(data));

  const rawValue = data.readUInt16LE(0) * 1.0;
  let soilMoisture =
    11.4293 +
    (0.0000000010698 * Math.pow(rawValue, 4.0) -
      0.00000152538 * Math.pow(rawValue, 3.0) +
      0.000866976 * Math.pow(rawValue, 2.0) -
      0.169422 * rawValue);
  soilMoisture =
    100.0 *
    (0.0000045 * Math.pow(soilMoisture, 3.0) - 0.00055 * Math.pow(soilMoisture, 2.0) + 0.0292 * soilMoisture - 0.053);
  console.log(colors.bold.green(`Moisture: ${soilMoisture} (${rawValue})`));
  return soilMoisture;
};

module.exports = {
  readMoisture,
};
