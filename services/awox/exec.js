const prompts = require('prompts');
const colors = require('colors');
const { DEVICE_PARAMS: AWOX_PARAMS, DEVICE_TYPES } = require('./lib/utils/awox.constants');
const { DEVICE_PARAMS } = require('./lib/handlers/mesh/awox.mesh.constants');
const { setDeviceParam } = require('../../utils/setDeviceParam');

const exec = async (awox, awoxDevice, bluetooth, deviceUuid) => {
  const { features, params } = awoxDevice;

  const credentialParam = params.find((p) => p.name === AWOX_PARAMS.DEVICE_TYPE);
  const { value: awoxType } = credentialParam || {};
  const { sessionKey } = bluetooth.getPeripheral(deviceUuid) || {};
  if (awoxType !== DEVICE_TYPES.LEGACY && !sessionKey) {
    const { name } = await prompts([
      {
        type: 'text',
        name: 'name',
        message: 'Enter Mesh device name:',
      },
    ]);

    setDeviceParam(awoxDevice, DEVICE_PARAMS.MESH_NAME, name);

    const { password } = await prompts([
      {
        type: 'text',
        name: 'password',
        message: 'Enter Mesh device password:',
      },
    ]);

    setDeviceParam(awoxDevice, DEVICE_PARAMS.MESH_PASSWORD, password);
  }

  const { feature } = await prompts([
    {
      type: 'select',
      name: 'feature',
      message: 'Select action you want to try:',
      choices: features.map((feature) => {
        return {
          title: feature.type,
          value: feature,
        };
      }),
    },
  ]);

  const { min, max } = feature;
  const { value } = await prompts([
    {
      type: 'number',
      name: 'value',
      message: `Set value to apply: [${min} - ${max}]`,
      min,
      max,
    },
  ]);

  try {
    await awox.setValue(awoxDevice, feature, value);
    console.log(colors.green(`Command well sent`));
  } catch (e) {
    console.log(colors.bold.red(`Error while sending command: ${e.message}`));
  }

  const { again } = await prompts([
    {
      type: 'confirm',
      name: 'again',
      message: 'Try again?',
      initial: 'no',
    },
  ]);

  if (again) {
    return exec(awox, awoxDevice, bluetooth, deviceUuid);
  }

  return again;
};

module.exports = {
  exec,
};
