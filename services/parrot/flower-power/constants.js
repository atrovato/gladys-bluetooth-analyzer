const SERVICES = {
  CALIBRATION: '39e1fe0084a811e2afba0002a5d5c51b',
  LIVE: '39e1fa0084a811e2afba0002a5d5c51b',
};

const CHARACTERISTICS = {
  [SERVICES.CALIBRATION]: {
    COLOR: '39e1fe0484a811e2afba0002a5d5c51b',
  },
  [SERVICES.LIVE]: {
    SUNLIGHT: '39e1fa0184a811e2afba0002a5d5c51b',
    SOIL_EC: '39e1fa0284a811e2afba0002a5d5c51b',
    SOIL_TEMPERATURE: '39e1fa0384a811e2afba0002a5d5c51b',
    AIR_TEMPERATURE: '39e1fa0484a811e2afba0002a5d5c51b',
    MOISTURE: '39e1fa0584a811e2afba0002a5d5c51b',
  },
};

const COLOR_MAPPER = {
  4: 'brown',
  6: 'green',
  7: 'blue',
};

module.exports = {
  SERVICES,
  CHARACTERISTICS,
  COLOR_MAPPER,
};
