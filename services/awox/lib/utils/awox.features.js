const { DEVICE_FEATURE_CATEGORIES, DEVICE_FEATURE_TYPES } = require('../../../../utils/constants');

const FEATURES = {
  [DEVICE_FEATURE_CATEGORIES.SWITCH]: {
    [DEVICE_FEATURE_TYPES.SWITCH.BINARY]: {
      category: DEVICE_FEATURE_CATEGORIES.SWITCH,
      type: DEVICE_FEATURE_TYPES.SWITCH.BINARY,
      min: 0,
      max: 1,
    },
  },
  [DEVICE_FEATURE_CATEGORIES.LIGHT]: {
    [DEVICE_FEATURE_TYPES.LIGHT.BINARY]: {
      category: DEVICE_FEATURE_CATEGORIES.LIGHT,
      type: DEVICE_FEATURE_TYPES.LIGHT.BINARY,
      min: 0,
      max: 1,
    },
    [DEVICE_FEATURE_TYPES.LIGHT.BRIGHTNESS]: {
      category: DEVICE_FEATURE_CATEGORIES.LIGHT,
      type: DEVICE_FEATURE_TYPES.LIGHT.BRIGHTNESS,
      min: 0,
      max: 100,
    },
    [DEVICE_FEATURE_TYPES.LIGHT.TEMPERATURE]: {
      category: DEVICE_FEATURE_CATEGORIES.LIGHT,
      type: DEVICE_FEATURE_TYPES.LIGHT.TEMPERATURE,
      min: 0,
      max: 100,
    },
    [DEVICE_FEATURE_TYPES.LIGHT.COLOR]: {
      category: DEVICE_FEATURE_CATEGORIES.LIGHT,
      type: DEVICE_FEATURE_TYPES.LIGHT.COLOR,
      min: 0,
      max: 16777215,
    },
  },
};

const generateFeature = (defaultFeature, deviceExternalId) => {
  return { ...defaultFeature, external_id: `${deviceExternalId}:${defaultFeature.type}` };
};

module.exports = {
  FEATURES,
  generateFeature,
};
