const Promise = require('bluebird');
const colors = require('colors');

const {
  discoverServices,
} = require('../../gladys/server/services/bluetooth/lib/utils/peripheral/bluetooth.discoverServices');
const { exploreCharacteristics } = require('./exploreCharacteristics');

const exploreServices = async (executor, peripheral) => {
  let services;

  try {
    executor.startLoading('Scanning for services...');
    services = await discoverServices(peripheral, []);
    executor.stopLoading();
  } catch (e) {
    services = [];
    executor.stopLoading();
    console.log(colors.bold.red('No services found.'));
  }

  return Promise.map(
    Object.values(services),
    async (service) => exploreCharacteristics(executor, peripheral, service),
    {
      concurrency: 1,
    },
  );
};

module.exports = {
  exploreServices,
};
