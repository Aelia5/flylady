const key = {
  count: 0,
  getKey: () => {
    key.count += 1;
    return key.count;
  },
};

module.exports = key;
