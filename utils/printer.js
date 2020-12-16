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

const printPeripheral = (peripheral, color = 'blue') => {
  const { addressType, connectable, advertisement, services } = peripheral;
  const { localName, serviceUuids, manufacturerData } = advertisement;

  console.log(colors[color](' -> Peripheral:'));
  console.log(colors[color](`   -> Address type: ${addressType}`));
  console.log(colors[color](`   -> Connectable: ${connectable}`));
  console.log(colors[color]('   -> Advertisement:'));
  console.log(colors[color](`     -> Local name: ${localName}`));
  console.log(colors[color](`     -> Manufacturer data: ${manufacturerData}`));
  console.log(colors[color](`     -> Services: ${serviceUuids}`));

  if (services) {
    console.log(colors[color](`   -> Services (${services.length}):`));
    services.forEach((service) => {
      const { uuid, name = 'no name', characteristics } = service;
      console.log(colors[color](`     -> ${uuid} (${name})`));

      if (characteristics) {
        console.log(colors[color](`       -> Characteristics (${characteristics.length}):`));
        characteristics.forEach((characteristic) => {
          const { uuid, name = 'no name', properties = [] } = characteristic;
          console.log(colors[color](`         -> ${uuid} (${name}): ${properties}`));
        });
      }
    });
  }
};

const uuidToMac = (uuid) => {
  return uuid.match(/.{1,2}/g).join(':');
};

module.exports = {
  printDevice,
  printPeripheral,
  uuidToMac,
};
