const { PARAMS } = require('../../gladys/server/services/bluetooth/lib/utils/bluetooth.constants');

const match = (device) => {
  const { params = [] } = device;
  return params
    .filter((p) => p.name === PARAMS.MANUFACTURER_DATA)
    .map((p) => p.value)
    .some((data) => data.startsWith('4300'));
};

module.exports = {
  match,
};
