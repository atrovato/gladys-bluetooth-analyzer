const colors = require('colors');

const printDevice = (device, color = 'blue') => {
  if (!device) {
    console.log(colors.red('No device.'));
  } else {
    const { name, model, features = [], params = [] } = device;
    console.log(colors[color](' -> Device:'));
    console.log(colors[color](`    - Name: ${name}`));
    console.log(colors[color](`    - Model: ${model}`));

    console.log(colors[color](`    - ${features.length} features`));
    features.forEach((feature) => {
      const { category, type } = feature;
      console.log(colors[color](`      - ${category} / ${type}`));
    });

    console.log(colors[color](`    - ${params.length} params`));
    params.forEach((param) => {
      const { name, value } = param;
      console.log(colors[color](`      - ${name}: ${value}`));
    });
  }
};

const uuidToMac = (uuid) => {
  return uuid.match(/.{1,2}/g).join(':');
};

const printSummary = (result) => {
  const { device, service, serviceModel } = result;
  console.log(` -> Service: ${service.description.title}`);
  console.log(` -> Model: ${serviceModel}`);
  printDevice(device, 'white');
};

module.exports = {
  printDevice,
  uuidToMac,
  printSummary,
};
