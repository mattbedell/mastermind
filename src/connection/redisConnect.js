const { promisify } = require('util');
const redis = require('redis');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS,
});

// https://github.com/NodeRedis/node_redis/issues/864#issuecomment-396164491
const proxyPromise = {
  get(target, prop) {
    return promisify(target[prop]).bind(target);
  },
};

const promiseClient = new Proxy(client, proxyPromise);

client.on('error', (err) => {
  console.log(err);
});

module.exports = {
  redis,
  client,
  promiseClient,
};
