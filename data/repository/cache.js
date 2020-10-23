const mongoose = require("mongoose");
const { client } = require("../connections/connectRedis");
const util = require("util");
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.cache = function () {
  this.useCache = true;
  return this;
};
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    console.log("I AM NOT USING CACHE OVER HERE");
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collectionName: this.mongooseCollection.name,
    })
  );

  const cachedValue = await client.get(key);
  if (cachedValue) {
    const doc = JSON.parse(cachedValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(d);
  }
  const result = await exec.apply(this, arguments);
  client.set(key, JSON.stringify(result));
  return result;
};
