
const path = require('path');
const http = require('http');
const express = require('express');
const history = require('connect-history-api-fallback');

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

server.listen('3001', () => console.log('Listening on port 3001'));
