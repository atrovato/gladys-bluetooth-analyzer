const colors = require('colors');

const printDevice = (device) => {
  if (!device) {
    console.log(colors.red('No device.'));
  } else {
    const { name, model, features = [], params = [] } = device;
    console.log(colors.blue(' -> Device:'));
    console.log(colors.blue(`    - Name: ${name}`));
    console.log(colors.blue(`    - Model: ${model}`));

    console.log(colors.blue(`    - ${features.length} features`));
    features.forEach((feature) => {
      const { category, type } = feature;
      console.log(colors.blue(`      - ${category} / ${type}`));
    });

    console.log(colors.blue(`    - ${params.length} params`));
    params.forEach((param) => {
      const { name, value } = param;
      console.log(colors.blue(`      - ${name}: ${value}`));
    });
  }
};

const uuidToMac = (uuid) => {
  return uuid.match(/.{1,2}/g).join(':');
};

module.exports = {
  printDevice,
  uuidToMac,
};
