
const path = require('path');
const http = require('http');
const argv = require('argv');
const express = require('express');
const history = require('connect-history-api-fallback');

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

app.use('/dist', express.static(path.resolve('dist')));

app.use(history({
  index: '/',
  verbose: true,
}));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

server.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
