module.exports = class Base {
  constructor(socket, id) {
    this.id = id;
    this.data = new Map();
    this.socket = socket;
    this.socket.join(id);
  }

  serialize(obj = this.data) {
    return Array.from(obj.keys()).reduce((serialObj, key) => {
      const val = obj.get(key);
      /* eslint-disable-next-line */
      serialObj[key] = val instanceof Map ? this.serialize(val) : val;
      if (val instanceof Map) {
        /* eslint-disable */
        serialObj[key] = this.serialize(val);
      } else if (val instanceof Base) {
        serialObj[key] = val.serialize();
        /* eslint-enable */
      }
      return serialObj;
    }, {});
  }
};
