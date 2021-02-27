const prompts = require('prompts');
const colors = require('colors');

const exec = async (awox, awoxDevice) => {
  const { features } = awoxDevice;

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
    return exec(awox, awoxDevice);
  }

  return again;
};

module.exports = {
  exec,
};
