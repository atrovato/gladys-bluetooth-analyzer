const EventEmitter = require('events');

const gladys = {
  device: {
    get: () => [],
  },
  stateManager: {
    get: () => null,
  },
  event: new EventEmitter(),
};

module.exports = {
  gladys,
};
