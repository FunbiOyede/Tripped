const mongoose = require("mongoose");
const { client } = require("../connections/connectRedis");
const util = require("util");
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.cache = function (option = {}) {
  this.useCache = true;
  this.cacheKey = JSON.stringify(option.key) || "";
  return this;
};
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  // const key = JSON.stringify(
  //   Object.assign({}, this.getQuery(), {
  //     collectionName: this.mongooseCollection.name,
  //   })
  // );

  const cachedValue = await client.get(this.cacheKey);
  if (cachedValue) {
    const doc = JSON.parse(cachedValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(d);
  }
  const result = await exec.apply(this, arguments);
  //expires in two minutes
  client.set(this.cacheKey, JSON.stringify(result), "EX", 120);
  return result;
};

module.exports = {
  clearCache(cacheKey) {
    client.del(JSON.stringify(cacheKey));
  },
};
