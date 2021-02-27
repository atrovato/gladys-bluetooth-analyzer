const percentageToValue = (value, min, max) => {
  return Math.round(min + (value * (max - min)) / 100);
};

module.exports = {
  percentageToValue,
};
