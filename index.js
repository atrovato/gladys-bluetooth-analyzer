const tracer = require('tracer');
const colors = require('colors');

const { EVENTS, WEBSOCKET_MESSAGE_TYPES } = require('./gladys/server/utils/constants');

const StepExecutor = require('./steps');
const { gladys } = require('./utils/gladys');
const BluetoothManager = require('./gladys/server/services/bluetooth/lib');
const quit = require('./steps/quit');

// Configure service logger
tracer.setLevel('trace');

console.clear();

const bluetooth = new BluetoothManager(gladys, 'BLUETOOTH_SERVICE');
const stepExecutor = new StepExecutor(bluetooth);

gladys.event.once(EVENTS.WEBSOCKET.SEND_ALL, ({ type, payload }) => {
  if (type === WEBSOCKET_MESSAGE_TYPES.BLUETOOTH.STATE && payload.ready) {
    stepExecutor.run();
  } else {
    quit(colors.bold.red('Something went wrong'));
  }
});

bluetooth.start();

process.on('unhandledRejection', (err) => {
  stepExecutor.quit(colors.bold.red(err));
});

process.on('beforeExit', async () => {
  if (bluetooth) {
    await bluetooth.stop();
  }
});
