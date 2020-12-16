const colors = require('colors');

const { SERVICES, CHARACTERISTICS } = require('./constants');

const readElectricalConductivity = async (peripheral) => {
  this.executor.startLoading(`Reading electrical conductivity...`);
  const data = await this.bluetooth.readDevice(peripheral, SERVICES.LIVE, CHARACTERISTICS[SERVICES.LIVE].SOIL_EC);
  this.executor.stopLoading();

  console.log(colors.gray(data));

  const electricalConductivity = data.readUInt16LE(0) * 1.0;
  console.log(colors.bold.green(`Electrical Conductivity: ${electricalConductivity}`));
  return electricalConductivity;
};

module.exports = {
  readElectricalConductivity,
};
