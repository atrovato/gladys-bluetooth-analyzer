const colors = require('colors');

const executeService = async (executor) => {
  const { service } = executor.result;
  console.log(colors.gray(`Now executing ${service.description.title} steps...`));
  return service.run(executor);
};

module.exports = {
  executeService,
};
