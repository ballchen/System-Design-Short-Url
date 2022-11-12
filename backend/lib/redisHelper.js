const { createClient } = require('redis');
const config = require('config');

const client = createClient({
  url: config.get('redisUrl'),
});

client.connect();
client.on('error', (error) => {
  console.error(
    'Redis Error',
    error.message,
    error.stack,
  );
});

const setCodeCache = async ({ code, url }) => {
  await client.set(code, url, 'EX', 60);
};

const removeCodeCache = async ({ code }) => {
  await client.del(code);
};

const getCodeCache = async ({ code }) => client.get(code);

module.exports = {
  setCodeCache,
  removeCodeCache,
  getCodeCache,
};
