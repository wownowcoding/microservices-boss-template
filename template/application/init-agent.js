const humps = require('humps');
module.exports = agent => {
  agent.timeout = (fn = () => { }, timestamp = 0) => {
    const ___timeout = setTimeout(() => {
      clearTimeout(___timeout);
      typeof fn === 'function' && fn();
    }, timestamp)
  };
  global.timeout = (fn = () => { }, timestamp = 0) => new Promise((resolve, reject) => {
    try {
      const ___timeout = setTimeout(() => {
        clearTimeout(___timeout);
        try {
          typeof fn === 'function' && resolve(fn());
        } catch (error) {
          reject(error);
        }
      }, timestamp);
    } catch (err) {
      reject(err);
    }
  });
  global.keysToLocaleLowerCase = __obj => typeof __obj === 'object' && Object.fromEntries(Object.entries(__obj).map(e => [humps.camelize(e[0]).toLocaleLowerCase(), e[1]])) || __obj;
  global.filterField = (obj, fields, isOnlyTake = false) => {
    if (Array.isArray(fields) && fields.length) {
      const __fields = fields.filter(e => typeof e === 'string').map(e => humps.camelize(e).toLocaleLowerCase());
      if (__fields && __fields.length) {
        return Object.fromEntries(Object.entries(obj).filter(e => {
          if (isOnlyTake) {
            return __fields.indexOf(humps.camelize(e[0]).toLocaleLowerCase()) !== -1;
          }
          return __fields.indexOf(humps.camelize(e[0]).toLocaleLowerCase()) === -1;
        }));
      }
    }
    return obj;
  }
};