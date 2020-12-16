const colors = require('colors');

const { SERVICES, CHARACTERISTICS, COLOR_MAPPER } = require('./constants');

const readColor = async (peripheral) => {
  this.executor.startLoading(`Reading color...`);
  const data = await this.bluetooth.readDevice(
    peripheral,
    SERVICES.CALIBRATION,
    CHARACTERISTICS[SERVICES.CALIBRATION].COLOR,
  );
  this.executor.stopLoading();

  console.log(colors.gray(data));

  const color = data.readUInt16LE(0);
  console.log(colors.bold.green(`Color: ${COLOR_MAPPER[color]} (${color})`));
  return color;
};

module.exports = {
  readColor,
};
