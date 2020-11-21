const {
  discoverCharacteristics,
} = require('../../gladys/server/services/bluetooth/lib/utils/service/bluetooth.discoverCharacteristics');

const exploreCharacteristics = async (executor, peripheral, service) => {
  try {
    executor.startLoading(`Scanning for characteristics on service ${service.uuid}...`);
    return discoverCharacteristics(service, []);
  } catch (e) {
    console.log(e);
  } finally {
    executor.stopLoading();
  }
};

module.exports = {
  exploreCharacteristics,
};
