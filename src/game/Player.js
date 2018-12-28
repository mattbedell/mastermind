const Base = require('./base');

module.exports = class Player extends Base {
  constructor(lobby, socket, playerId, name) {
    super(socket, playerId);
    this.lobby = lobby;

    this.data = new Map([
      ['playerId', playerId],
      ['lobbyId', this.lobby.getLobbyId()],
      ['moves', []],
      ['name', name],
      ['isHost', false],
    ]);
  }

  getMoves() {
    return this.data.get('moves');
  }

  setIsHost(isHost = false) {
    this.data.set('isHost', isHost);
  }

  initSocket(socket) {
    socket.on('player_move', (msg) => {
      const moves = this.getMoves();
      moves.push(msg.move);
    });
  }

  updateSocket(socket) {
    this.socket = socket;
    this.initSocket(socket);
  }
};
