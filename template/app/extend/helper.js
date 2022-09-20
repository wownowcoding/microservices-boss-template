module.exports = {
  /**
   * 将 object 对象转换成 字符串
   */
  jsonStringify: (data) => new Promise((resolve, reject) => {
    process.nextTick(() => {
      try {
        resolve(JSON.stringify(data));
      } catch (jsonStringifyError) {
        reject(jsonStringifyError);
      }
    });
  }),
  /**
   * 深度快速复制一个对象
   * @param {json} data 
   */
  objTranscript(data) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        try {
          resolve(JSON.parse(this.jsonStringify(data)));
        } catch (objTranscriptError) {
          reject(objTranscriptError);
        }
      });
    })
  },
  parseMsg(action, payload = {}, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now()
    }, metadata);

    return {
      meta,
      data: {
        action,
        payload
      }
    };
  }
};
