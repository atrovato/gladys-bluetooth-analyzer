const NAME = 'MiFlora';

const printValues = (value) => {
  const temperature = value.readUInt16LE(0) / 10;
  const light = value.readUInt32LE(3);
  const moisture = value.readUInt16BE(6);
  const fertility = value.readUInt16LE(8);

  console.log(colors.gray(value));
  console.log(
    colors.bold.green(`Temperature: ${temperature}°C | Light ${light} | Moisture ${moisture} | Fertility ${fertility}`),
  );
};

const run = async (peripheral, executor) => {
  executor.startLoading(`Reading values of ${NAME} device...`);
  const readValue = await executor.bluetooth.read(
    peripheral,
    '0000120400001000800000805f9b34fb',
    '00001a0100001000800000805f9b34fb',
  );
  executor.stopLoading();

  printValues(readValue);

  return readValue;
};

module.exports = {
  NAME,
  run,
};
