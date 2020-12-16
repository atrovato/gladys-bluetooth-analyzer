const { readColor } = require('./readColor');
const { readSunlight } = require('./readSunlight');
const { readElectricalConductivity } = require('./readElectricalConductivity');
const { readSoilTemperature } = require('./readSoilTemperature');
const { readAirTemperature } = require('./readAirTemperature');
const { readMoisture } = require('./readMoisture');

const FlowerPower = function FlowerPower(executor) {
  this.bluetooth = executor.bluetooth;
  this.executor = executor;
};

FlowerPower.prototype.readColor = readColor;
FlowerPower.prototype.readSunlight = readSunlight;
FlowerPower.prototype.readElectricalConductivity = readElectricalConductivity;
FlowerPower.prototype.readSoilTemperature = readSoilTemperature;
FlowerPower.prototype.readAirTemperature = readAirTemperature;
FlowerPower.prototype.readMoisture = readMoisture;

module.exports = FlowerPower;
