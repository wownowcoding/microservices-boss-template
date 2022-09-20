import config from '@/config.js'
const { systemFlag } = config;
const _storage = {};
export default {
  hasLocalStorage: () => ('localStorage' in window) && localStorage !== null,
  saveObject(key, value, expire) {
    const obj = {
      data: value
    };
    if (expire > 0) {
      obj.expire = Date.now() + expire * 1000;
    }

    if (this.hasLocalStorage()) {
      localStorage.setItem(`${systemFlag}-${key}`, encodeURIComponent(JSON.stringify(obj)));
    } else {
      _storage[`${systemFlag}-${key}`] = obj;
    }
    return value;
  },
  loadObject(key) {
    let obj = '';
    if (this.hasLocalStorage()) {
      const value = localStorage.getItem(`${systemFlag}-${key}`);
      try {
        obj = JSON.parse(decodeURIComponent(value));
      } catch (e) {
        obj = value;
      }
    } else {
      obj = _storage[`${systemFlag}-${key}`];
    }
    if (obj && obj.data !== null && obj.data !== undefined) {
      if (!('expire' in obj) || obj.expire > Date.now()) {
        return obj.data;
      }
      this.remove(`${systemFlag}-${key}`);
    }
    return undefined;
  },
  deleteObject(key) {
    if (this.hasLocalStorage()) {
      localStorage.removeItem(`${systemFlag}-${key}`);
    } else {
      delete _storage[`${systemFlag}-${key}`];
    }
  },
  clear() {
    if (this.hasLocalStorage()) {
      localStorage.clear();
    }
  }
}
