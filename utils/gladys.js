const EventEmitter = require('events');

const gladys = {
  device: {
    get: () => [],
  },
  event: new EventEmitter(),
};

module.exports = {
  gladys,
};
