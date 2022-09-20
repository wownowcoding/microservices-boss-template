const uuid = require('node-uuid');
const flatten = require('flat');
module.exports = {
  //  连接池
  connectionPool: {},
  //  获取操作的集合
  getCollection(dbName, collectionName, msgId) {
    try {
      if (!(this && this.mongodb && this.mongodb.client && this.mongodb.client.db)) {
        const ctx = this.createAnonymousContext();
        ctx.logger.error('connection mongodb error!');
        global.timeout(() => {
          //  创建链接
          ctx.service.mongodb.mongodb.connectMongodb();
        }, 1000);
        return '';
      }
      if (!this.connectionPool[dbName]) {
        this.connectionPool[dbName] = {
          db: this.mongodb.client.db(dbName)
        }
      }
      if (!this.connectionPool[dbName].collections) {
        this.connectionPool[dbName].collections = {}
      }
      if (!this.connectionPool[dbName].collections[collectionName]) {
        this.connectionPool[dbName].collections[collectionName] = {
          collection: new this.Mongo({
            collection: this.connectionPool[dbName].db.collection(collectionName),
            mongodb: this.mongodb,
            app: this.mongodb.app,
            mobileCollectionName: collectionName,
            msgId,
            db: this.connectionPool[dbName].db,
            queryRecordCollection: this.connectionPool[dbName].db.collection('query-keys')
          })
        };
      }
      this.connectionPool[dbName].collections[collectionName].collection.setInit(collectionName, msgId);
      return this.connectionPool[dbName].collections[collectionName].collection;
    } catch(err) {
      this.logger.error('connection mongodb error: ', err);
      global.timeout(() => {
        //  创建链接
        const ctx = this.createAnonymousContext();
        ctx.service.mongodb.mongodb.connectMongodb();
      }, 1000);
      return '';
    }
  },
  saveLog(msg) {
    try {
      const poolKeys = Object.keys(this.connectionPool);
      if (poolKeys && poolKeys.length) {
        return this.connectionPool[poolKeys[0]].db.collection('log').insertOne({ ...msg, createTime: new Date().valueOf() }, { writeConcern: 10000 }, () => {}, (error, { result, insertedId }) => {});
      }
    } catch(err) {}
  },
  Mongo: class Mongo {
    constructor(params = {}) {
      const { collection, mongodb, app, mobileCollectionName, msgId, db, queryRecordCollection } = params;
      this.mobileCollectionName = mobileCollectionName;
      this.app = app || {};
      this.msgId = msgId || undefined;
      this.collection = collection;
      this.db = db;
      this.maxTimeMS = 3000;
      this.wtimeout = 10000;
      this.mongodb = mongodb;
      //  用来保存查询条件字符串，方便建立组合索引
      this.queryRecordCollection = queryRecordCollection;
      if (this.app && this.app.config && this.app.config.mongo && this.app.config.mongo.openLog) {
        this.logger = this.app.logger;
        return;
      }
      this.logger = {
        info: () => {},
        error: () => {}
      }

      
      Object.keys(collection.__proto__).forEach(e => {
        try {
          if (!this[e] && collection.__proto__[e]) {
            this[e] = typeof collection.__proto__[e] === 'function' && function(...args) {
              this.logger.info(`mongo(${e}) args:`, args);
              return collection.__proto__[e](...args);
            } || collection.__proto__[e];
          }
        } catch(err) {}
      });
      Object.keys(mongodb).forEach(e => {
        try {
          if (!this[e] && mongodb[e]) {
            this[e] = mongodb[e];
            this[e] = typeof mongodb[e] === 'function' && function(...args) {
              this.logger.info(`mongo(${e}) args:`, args);
              return mongodb[e](...args);
            } || collection.__proto__[e];
          }
        } catch(err) {}
      });
    }
    ObjectId(id) { return this.mongodb.ObjectId(id); }
    ObjectID(id) { return this.mongodb.ObjectId(id); }
    Objectid(id) { return this.mongodb.ObjectId(id); }
    objectId(id) { return this.mongodb.ObjectId(id); }
    objectID(id) { return this.mongodb.ObjectId(id); }
    objectid(id) { return this.mongodb.ObjectId(id); }
    findQueryToList(query) {
      if (typeof query === 'object') {
        const flattenData = flatten(query)
        return Object.entries(flattenData).map(e => e[0]).sort();
      }
      return [];
    }
    saveQuery(query) {
      const queryKeys = this.findQueryToList(query);
      if (queryKeys && queryKeys.length) {
        const recordQuery = { query: encodeURIComponent(queryKeys.join(',')), collectionName: this.mobileCollectionName };
        this.queryRecordCollection.countDocuments(recordQuery, { maxTimeMS: this.maxTimeMS }, (error, count) => {
          if (!error) {
            return !count ? 
              this.queryRecordCollection.insertOne({ query: recordQuery.query, collectionName: recordQuery.collectionName, count: 1, createTime: new Date().valueOf() }, { writeConcern: this.wtimeout }) :
              this.queryRecordCollection.updateMany(recordQuery, { $inc: { count: 1 } }, { writeConcern: this.wtimeout })
          }
        });
      }
    }
    setInit(mobileCollectionName, msgId = '') {
      this.mongoMsgId = msgId;
      this.msgId = msgId;
      this.mobileCollectionName = mobileCollectionName;
    }
    getResult(funName, data, error, startTime, mongoMsgId) {
      const ret = {
        data,
        error
      };
      const endTime = new Date().valueOf();
      const time = endTime - startTime;
      if (error && error.toString().indexOf('operation exceeded time limit') !== -1) {
        this.logger.info(`mongo ${this.mobileCollectionName} ${funName} ${this.mongoMsgId} ${mongoMsgId} (${time} 毫秒) 查询超时!`);
      }
      if (funName === 'find') {
        this.logger.info(`mongo ${this.mobileCollectionName} ${funName} ${this.mongoMsgId} ${mongoMsgId} (${time} 毫秒) result:`, ret && ret.data && ret.data.length || 0);
      } else {
        this.logger.info(`mongo ${this.mobileCollectionName} ${funName} ${this.mongoMsgId} ${mongoMsgId} (${time} 毫秒) result:`, JSON.stringify(ret));
      }
      return ret
    }
    /**
     * 获取表的所有索引
     * @returns {
     *   list: [String, String],
     *   dataSource: 
     * }
     */
    async getCollectionIndexs() {
      return (await new Promise(async resolve => {
        const result = {
          list: [],
          dataSource: {},
          datas: {}
        };
        try {
          (await this.collection.listIndexes()).each((err, __data) => {
            try {
              if (__data && __data.key) {
                Object.keys(__data.key).forEach(q => {
                  result.list.push(q);
                  result.dataSource[q] = __data.key[q];
                  result.datas[q] = __data;
                });
              } else {
                resolve(result);
              }
            } catch(err) {}
          });
        } catch(err) {}
      }));
    }
    async listIndexes() {
      const res = { data: undefined, error: undefined };
      try {
        res.data = await new Promise(async (resolve, reject) => {
          const indexs = [];
          try {
            (await this.collection.listIndexes()).each((err, __data) => __data && indexs.push(__data) || resolve(indexs));
          } catch(listIndexesError) {
            reject(listIndexesError);
          }
        });
      } catch(error) {
        res.error = error;
      }
      return res;
    }
    /**
     * 删除索引
     * @param { 索引名称 } indexName 
     * @returns 
     */
    async dropIndex(indexName) {
      return await this.collection.dropIndex(indexName, {
        writeConcern: this.wtimeout
      });
    }
    async createIndexes(indexs) {
      const ret = { data: undefined, error: undefined };
      try {
        ret.data = await this.collection.createIndexes(indexs.map(e => ({ key: e.name && e.value && { [e.name]: e.value } || e })));
      } catch(error) {
        ret.error = error;
      }
      return ret;
    }
    /**
     * 设置表索引
     * @param {*} list 
     * @returns 
     */
    async setCollectionIndex(list) {
      const indexLists = await this.getCollectionIndexs();
      const newIndex = [];
      try {
        for (const __index of list) {
          if (__index.name && __index.value && !(indexLists.dataSource[__index.name] && indexLists.dataSource[__index.name] === __index.value)) {
            const jobs = [];
            if (indexLists.dataSource[__index.name]) {
              jobs.push(this.dropIndex(indexLists.datas[__index.name].name));
            }
            jobs.push(this.collection.createIndex({ [__index.name]: __index.value }, { writeConcern: this.wtimeout }));
            await Promise.all(jobs);
            newIndex.push(__index.name);
          } else {
            jobs.push(this.collection.createIndex(__index, { writeConcern: this.wtimeout }));
          }
        }
      } catch(error) {}
      return {
        ...(await this.getCollectionIndexs()),
        newIndex
      };
    }
    /**
     * 查询数组
     * http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
     * @param {*} query 
     * @param {*} options 
     * @returns 
     */
    find(query = {}, options = {}, maxTimeMS = this.maxTimeMS) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] find query:`, query);
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] find options:`, options);
      return new Promise(resolve => {
        try {
          this.collection.find(query, Object.assign({}, options, {
            maxTimeMS
          })).toArray((error, data) => {
            this.saveQuery(query);
            resolve(this.getResult('find', data || undefined, error, startTime, mongoMsgId));
          })
        } catch(tryError) {
          resolve(this.getResult('find', undefined, tryError, startTime, mongoMsgId));
        }
      })
    }
    /**
     * 查询一个对象
     * http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne
     * @param {*} query 
     * @param {*} options 
     * @returns 
     */
    findOne(query = {}, options = {}, maxTimeMS = this.maxTimeMS) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] findOne query:`, query);
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] findOne options:`, options);
      return new Promise(resolve => {
        try {
          this.collection.findOne(query, Object.assign({}, options, {
            maxTimeMS
          }), (error, data) => {
            this.saveQuery(query);
            resolve(this.getResult('findOne', data || undefined, error, startTime, mongoMsgId));
          });
        } catch(error) {
          resolve(this.getResult('findOne', undefined, error, startTime, mongoMsgId));
        }
      });
    }
    /**
     * 保存对象
     * http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne
     * @param {*} document 
     * @returns 
     */
    insertOne(document) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] insertOne document:`, document);
      return new Promise(resolve => {
        try {
          if (typeof document === 'object') {
            this.collection.insertOne(JSON.parse(JSON.stringify({
              ...(global.filterField(document, ['$unset', '_id'])),
              createTime: new Date().valueOf()
            })), {
              writeConcern: this.wtimeout
            }, (error, data = {}) => {
              const { result = undefined, insertedId } = data;
              resolve(this.getResult('insertOne', result && { ...result, _id: insertedId } || undefined, error, startTime, mongoMsgId));
            });
          } else {
            resolve(this.getResult('insertOne', undefined, 'Document is not an object!', startTime, mongoMsgId));
          }
        } catch(error) {
          resolve(this.getResult('insertOne', undefined, error, startTime, mongoMsgId));
        }
      });
    }
    /**
     * 插入多个对象
     * http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany
     * @param {*} documentList 
     * @returns 
     */
    insertMany(documentList, isGetId = false) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] insertMany documentList:`, documentList);
      return new Promise(resolve => {
        try {
          if (typeof documentList === 'object' && Array.isArray(documentList)) {
            this.collection.insertMany(documentList.map(e => {
              return JSON.parse(JSON.stringify({
                ...(global.filterField(e, ['$unset', '_id'])),
                createTime: new Date().valueOf()
              }))
            }), {
              writeConcern: this.wtimeout
            }, (error, ret = {}) => {
              const { result = {}, insertedIds = {} } = ret || {};
              if (isGetId) {
                if (result && result.ok && result.n) {
                  for(const index of Object.keys(insertedIds)) {
                    documentList[index - 0]._id = insertedIds[index];
                  }
                }
                resolve(this.getResult('insertMany', result && { result, documentList } || undefined, error, startTime, mongoMsgId));
                return;
              }
              resolve(this.getResult('insertMany', result || undefined, error, startTime, mongoMsgId));
            });
          } else {
            resolve(this.getResult('insertMany', undefined, Array.isArray(documentList) && 'Document is not an Array!' || 'Document is not an object!', startTime, mongoMsgId));
          }
        } catch(error) {
          resolve(this.getResult('insertMany', undefined, error, startTime, mongoMsgId));
        }
      });
    }
    /**
     * 更新
     * http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#update
     * @param {*} filter 
     * @param {*} update 
     * @returns 
     */
    update(filter, update) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] update filter:`, filter);
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] update update:`, update);
      return new Promise(resolve => {
        try {
          this.collection.update(filter, {
            $set: {
              ...(global.filterField(update, ['$unset', '_id'])),
              modifyTime: new Date().valueOf()
            }
          }, { multi: true, writeConcern: this.wtimeout }).then(({ result }) => {
            this.saveQuery(filter);
            resolve(this.getResult('update', result || undefined, error, startTime, mongoMsgId));
          }).catch(error => resolve(this.getResult('update', undefined, error, startTime, mongoMsgId)));
        } catch(error) {
          resolve(this.getResult('update', undefined, error, startTime, mongoMsgId))
        }
      })
    }
    distinct(key, query, options) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] distinct key:`, key);
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] distinct query:`, query);
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] distinct options:`, options);
      return new Promise(resolve => {
        try {
          this.collection.distinct(key, query, Object.assign({}, options, {
            maxTimeMS: options && options.maxTimeMS || this.maxTimeMS
          }), (error, data) => {
            this.saveQuery(query);
            resolve(this.getResult('distinct', data || undefined, error, startTime, mongoMsgId));
          });
        } catch(error) {
          resolve(this.getResult('distinct', undefined, error, startTime, mongoMsgId));
        }
      });
    }
    aggregate(pipeline, options) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] aggregate pipeline:`, pipeline);
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] aggregate options:`, options);

      return new Promise(resolve => {
        try {
          const aggCursor = this.collection.aggregate(pipeline, Object.assign({}, options || {}, {
            maxTimeMS: options && options.maxTimeMS || this.maxTimeMS
          }));
          let result, error;
          aggCursor.each((err, data) => {
            if (!err && !data) {
              resolve(this.getResult('aggregate', result || undefined, error, startTime, mongoMsgId));
            }
            if (!error) {
              if (err) {
                error = err;
              } else if (data) {
                if (!result) {
                  result = [];
                }
                result.push(data);
              }
            }
          });
        } catch(error) {
          resolve(this.getResult('aggregate', undefined, error, startTime, mongoMsgId));
        }
      });
    }
    /**
     * 更新以一个对象
     * http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne
     * @param {*} filter 
     * @param {*} update 
     * @returns 
     */
    updateOne(filter, update) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] updateOne filter:`, filter);
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] updateOne update:`, update);
      return new Promise(resolve => {
        try {
          const setData = {
            $set: {
              ...(global.filterField(update, ['$unset', '_id'])),
              modifyTime: new Date().valueOf()
            }
          };
          if (update.$unset) {
            setData.$unset = update.$unset;
          }
          this.collection.updateOne(filter, setData, { writeConcern: this.wtimeout }).then(({ result }) => {
            this.saveQuery(filter);
            resolve(this.getResult('updateOne', result || undefined, undefined, startTime, mongoMsgId));
          }).catch(error => resolve(this.getResult('updateOne', undefined, error, startTime, mongoMsgId)));
        } catch(error) {
          resolve(this.getResult('updateOne', undefined, error, startTime, mongoMsgId))
        }
      })
    }
    /**
     * 更新对象
     * http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateMany
     * @param {*} filter 
     * @param {*} update 
     * @returns 
     */
    updateMany(filter, update, other = {}) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] updateMany filter:`, filter);
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] updateMany update:`, update);
      return new Promise(resolve => {
        try {
          this.collection.updateMany(filter, {
            $set: {
              ...(global.filterField(update, ['$unset', '_id'])),
              modifyTime: new Date().valueOf()
            },
            ...other
          }, { writeConcern: this.wtimeout }).then(({ result }) => {
            this.saveQuery(filter);
            resolve(this.getResult('updateMany', result || undefined, undefined, startTime, mongoMsgId));
          }).catch(error => resolve(this.getResult('updateMany', undefined, error, startTime, mongoMsgId)));
        } catch(error) {
          resolve(this.getResult('updateMany', undefined, error, startTime, mongoMsgId))
        }
      })
    }
    /**
     * 删除一个对象
     * http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteOne
     * @param {*} filter 
     * @returns 
     */
    deleteOne(filter) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] deleteOne filter:`, filter);
      return new Promise(resolve => {
        try {
          this.collection.deleteOne(filter, { writeConcern: this.wtimeout }, (error, { result }) => {
            this.saveQuery(filter);
            resolve(this.getResult('deleteOne', result || undefined, error, startTime, mongoMsgId));
          });
        } catch(error) {
          resolve(this.getResult('deleteOne', undefined, error, startTime, mongoMsgId));
        }
      });
    }
    /**
     * 批量删除
     * http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteMany
     * @param {*} filter 
     * @returns 
     */
    deleteMany(filter) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] deleteMany filter:`, filter);
      return new Promise(resolve => {
        try {
          this.collection.deleteMany(filter, { writeConcern: this.wtimeout }, (error, { result }) => {
            this.saveQuery(filter);
            resolve(this.getResult('deleteMany', result || undefined, error, startTime, mongoMsgId));
          });
        } catch(error) {
          resolve(this.getResult('deleteMany', undefined, error, startTime, mongoMsgId));
        }
      });
    }
    /**
     * 数量
     * http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#count
     * @param {*} query 
     * @returns 
     */
    count(query) {
      const startTime = new Date().valueOf();
      const mongoMsgId = `mongomsgid${uuid.v1()}`.replace(/\-/g, '');
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} [${mongoMsgId}] count query:`, query);
      return new Promise(resolve => {
        try {
          this.collection.countDocuments(query, { maxTimeMS: this.maxTimeMS }, (error, result) => {
            this.saveQuery(query);
            resolve(this.getResult('count', result || 0, error, startTime, mongoMsgId));
          });
        } catch(error) {
          resolve(this.getResult('count', 0, error, startTime, mongoMsgId));
        }
      });
    }
    async mongoPage(paramsPage = {}) {
      const {
        id, filter, sort, sortType, size = 15, wtimeout = this.wtimeout
      } = paramsPage;
      const pageCurrent = {
        currentTotal: 0,
        size: !isNaN(size - 0) && parseInt(size, 10) || 15,
        id,
        dataSource: []
      };
      const query = Array.isArray(filter) && filter.length && filter[0] || filter;
      const options = Array.isArray(filter) && filter.length && filter[1] || {};
      options.limit = pageCurrent.size;
      if (sort) {
        options.sort = [[sort, parseInt(sortType, 10)]];
      } else {
        options.sort = [['_id', -1]];
      }
      const sortMap = Object.fromEntries(options.sort);
      if (pageCurrent.id && sortMap._id && !query._id && JSON.stringify(query).indexOf('_id') === -1) {
        query._id = {
          [sortMap._id === -1 ? '$lt' : '$gt']: this.ObjectId(pageCurrent.id.toString())
        }
      }
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} mongoPage:\n`, JSON.stringify({
        query,
        options
      }, null, 2));

      try {
        //  开始查询
        const { data: list } = await this.find(query, options, wtimeout);
        if (list && list.length) {
          pageCurrent.dataSource = list;
          pageCurrent.id = list[list.length - 1]._id;
          pageCurrent.currentTotal = list.length;
        }
      } catch(dataSourceError) {
        return {
          error: dataSourceError,
          data: pageCurrent
        };
      }
      return {
        error: undefined,
        data: pageCurrent
      };
    }
    //  递归追尾分页
    async mongoPageEx(paramsPage = {}, callback = async () => {}, id) {
      const { data: page } = await this.mongoPage(JSON.parse(JSON.stringify(id && {...paramsPage, id} || paramsPage)));
      if (page && page.dataSource && page.dataSource.length) {
        const interrupt = await callback(page);
        page.dataSource.length = 0;
        page.dataSource = [];
        if (!interrupt) {
          await this.mongoPageEx({ ...paramsPage, id: page.id }, callback);
        }
      }
    }
    //  分页查询
    async page(paramsPage = {}) {
      const {
        filter, sort, sortType, current = 1, size = 15, wtimeout = this.wtimeout, total: paramsTotal
      } = paramsPage;
      const pageCurrent = {
        size: !isNaN(size - 0) && parseInt(size, 10) || 15,
        current: !isNaN(current - 0) && parseInt(current, 10) || 1,
        total: paramsTotal - 0 || 0,
        pageCount: 0,
        dataSource: []
      };
      // console.log('pageCurrent: ', pageCurrent);
      const query = Array.isArray(filter) && filter.length && filter[0] || filter;
      const options = Array.isArray(filter) && filter.length && filter[1] || {};
      options.limit = pageCurrent.size;
      options.skip = parseInt((pageCurrent.current - 1) * pageCurrent.size, 10);
      if (sort) {
        options.sort = [[sort, parseInt(sortType, 10)]];
      } else {
        options.sort = [['_id', -1]];
      }
      this.logger.info(`mongo ${this.mobileCollectionName} ${this.mongoMsgId} page:\n`, JSON.stringify({
        query,
        options
      }, null, 2));

      //  并行查询
      const [ { error: totalError, data: total }, { error: dataSourceError, data: dataSource } ] = await Promise.all([pageCurrent.total ? Promise.resolve({ data: pageCurrent.total }) : this.count(query), this.find(query, options, wtimeout)]);
      //  开始查询数据
      pageCurrent.total = total;
      //  计算总页数
      pageCurrent.pageCount = Math.ceil(pageCurrent.total / pageCurrent.size);
      //  当前页小于总页数，则开始查询数据
      pageCurrent.dataSource = dataSource || [];
      return {
        error: totalError || dataSourceError || undefined,
        data: pageCurrent
      };
    }
    async wownowPageEx(paramsPage, callback) {
      paramsPage.current = paramsPage.current || 1;
      const { data: one } = await this.wownowPage(paramsPage);
      //  没有数据则跳出
      if (!(one && one.list && one.list.length)) {
        return;
      }
      const { pages, list } = one;
      let interrupt = await callback(one);
      if (!interrupt) {
        //  如果只有一页则跳过
        if (pages === 1) {
          return;
        }
        //  不止一页则继续
        for (let i = paramsPage.current + 1; i <= pages; i++) {
          paramsPage.current = i;
          paramsPage.total = one.total;
          const { data: continuePages } = await this.wownowPage(paramsPage);
          interrupt = await callback(continuePages);
          if (interrupt) {
            return;
          }
        }
      }
    }
    /**
     * 拉平 java 分页结构
     * @param {*} paramsPage 
     */
    async wownowPage(paramsPage = {}) {
      try {
        const ret = await this.page(paramsPage);
        if (!ret.error) {
          const currentPageNum = ret.data.current > ret.data.pageCount ? ret.data.pageCount : ret.data.current;
          const navigatePages = paramsPage && paramsPage.filter && paramsPage.filter[1] && paramsPage.filter[1].navigatePages || 8;
          let navigatepageNums = [];
          const comArray = new Array(navigatePages + 1).join('0').split('');
          if (currentPageNum <= navigatePages) {
            navigatepageNums = comArray.map((e, i) => i + 1).filter(e => e <= ret.data.pageCount && e >= 1);
          } else if (currentPageNum >= parseInt(ret.data.pageCount - (navigatePages / 2), 10)) {
            navigatepageNums = comArray.map((e, i) => ret.data.pageCount - i).filter(e => e <= ret.data.pageCount && e >= 1);
          } else {
            navigatepageNums = comArray.map((e, i) => parseInt(currentPageNum - (navigatePages / 2) - 1, 10) + i).filter(e => ret.data.pageCount && e >= 1)
          }
          return { data: {
            pageNum: currentPageNum,
            pageSize: ret.data.size,
            size: ret.data.size,
            startRow: 1,
            endRow: 10,
            total: ret.data.total,
            pages: ret.data.pageCount,
            list: ret.data.dataSource,
            prePage: currentPageNum - 1,
            nextPage: currentPageNum === ret.data.pageCount ? 0 : currentPageNum + 1,
            hasPreviousPage: currentPageNum > 1,
            hasNextPage: currentPageNum < ret.data.pageCount,
            navigatePages,
            navigatepageNums,
            navigateFirstPage: currentPageNum - 1,
            navigateLastPage: ret.data.pageCount,
            lastPage: currentPageNum === ret.data.pageCount,
            firstPage: currentPageNum === 1
          } }
        }
      } catch(error) {
        return { error };
      }
    }
  }
}