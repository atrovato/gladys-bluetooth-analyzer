const { getCharacteristic } = require('../../gladys/server/services/bluetooth/lib/utils/bluetooth.getCharacteristic');
const { subscribe } = require('../../gladys/server/services/bluetooth/lib/utils/characteristic/bluetooth.subscribe');

const NAME = 'LYWSD03MMC';
const WAITING = 10000;

const printValues = (value) => {
  const temperature = value.readInt16LE(0) / 100;
  const hygrometry = value.readInt8(2);
  const voltage = value.readInt16LE(3) / 1000;

  console.log(colors.bold.green(`Temperature: ${temperature}°C | Hygrometry ${hygrometry}% | Voltage ${voltage}V`));
};

const run = async (peripheral, executor) => {
  executor.startLoading(`Subscribing to ${NAME} device...`);
  const characteristic = await getCharacteristic(
    peripheral,
    'ebe0ccb07a0a4b0c8a1a6ff2997da3a6',
    'ebe0ccc17a0a4b0c8a1a6ff2997da3a6',
  );
  await subscribe(characteristic, printValues);
  executor.stopLoading();

  executor.startLoading(`Waiting for new values (${WAITING / 1000} secondes)...`);
  const done = (resolve) => {
    executor.stopLoading();
    resolve();
  };
  return new Promise((resolve) => {
    setTimeout(done, WAITING, resolve);
  });
};

module.exports = {
  NAME,
  run,
};
