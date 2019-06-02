
const http = require('http');
const argv = require('argv');
const express = require('express');

const connectSock = require('./src/connection/index');

const { port: PORT, lobbycodelen: LOBBY_CODE_LENGTH } = argv.option([{
  name: 'port',
  short: 'p',
  type: 'int',
  description: 'Listen on port',
}, {
  // TODO: might do something with a load balancer here to adjust lobby code length
  // dynamically based on current combinations in use, spinning up another server
  // that requires n+1 character length as n length approaches max combos for that length.
  // ex: 2 letter codes have 676 combos, spin up a new server with 3 (17,576 combos), etc.
  name: 'lobbycodelen',
  short: 'l',
  type: 'int',
  description: 'Length of lobby join codes',
}])
  .run()
  .options;

// const Game = require('./src/game/index');


const app = express();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', process.env.APP_HOST);
//   next();
// });

const server = http.Server(app);
connectSock(server, LOBBY_CODE_LENGTH);

server.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
