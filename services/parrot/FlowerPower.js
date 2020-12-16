const prompts = require('prompts');
const FlowerPower = require('./flower-power');

const NAME = 'FlowerPower';

const run = async (peripheral, executor) => {
  const { pick } = await prompts([
    {
      type: 'multiselect',
      name: 'color',
      message: 'Pick capabilities to try',
      min: 1,
      choices: [
        { title: 'Color', value: 'color', selected: true },
        { title: 'Air Temperature', value: 'airTemperature', selected: true },
        { title: 'Electrical Conductivity', value: 'electricalConductivity', selected: true },
        { title: 'Soil Temperature', value: 'soilTemperature', selected: true },
        { title: 'Moisture', value: 'moisture', selected: true },
        { title: 'Sunlight', value: 'sunlight', selected: true },
      ],
    },
  ]);

  const flowerPower = new FlowerPower(executor);

  if (pick.includes('color')) {
    flowerPower.readColor(peripheral);
  }

  if (pick.includes('airTemperature')) {
    flowerPower.readAirTemperature(peripheral);
  }

  if (pick.includes('electricalConductivity')) {
    flowerPower.readElectricalConductivity(peripheral);
  }

  if (pick.includes('soilTemperature')) {
    flowerPower.readSoilTemperature(peripheral);
  }

  if (pick.includes('moisture')) {
    flowerPower.readMoisture(peripheral);
  }

  if (pick.includes('sunlight')) {
    flowerPower.readSunlight(peripheral);
  }

  return;
};

module.exports = {
  NAME,
  run,
};
