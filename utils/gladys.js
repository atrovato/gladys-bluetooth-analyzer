const EventEmitter = require('events');
const variables = {};
const services = {};

const gladys = {
  device: {
    get: () => [],
  },
  stateManager: {
    get: () => null,
  },
  variable: {
    getValue: (key) => variables[key],
    setValue: (key, value) => {
      variables[key] = value;
    },
  },
  services: {
    setService: (name, service) => {
      services[name] = service;
    },
    getService: (name) => {
      return services[name];
    },
  },
  event: new EventEmitter(),
};

module.exports = {
  gladys,
};
