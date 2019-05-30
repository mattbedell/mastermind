
const http = require('http');
const argv = require('argv');
const express = require('express');

const { port: PORT } = argv.option([{
  name: 'port',
  short: 'p',
  type: 'int',
  description: 'Listen on port',
}])
  .run()
  .options;

const Game = require('./src/game/index');

const app = express();
const server = http.Server(app);
const connectedGame = new Game(server);

server.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
