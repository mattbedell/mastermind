/* eslint-disable no-param-reassign */
export default {
  state: {
    colors: ['red', 'green', 'yellow', 'white', 'black', 'blue'],
    player: {
      playerId: 'ABCD-efwddq',
      lobbyId: 'ABCD',
      moves: [
        [3, 0, 1, 5],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      currentMove: [],
      name: 'matt',
      isHost: false,
    },
  },
  getters: {},
  mutations: {
    setPlayer(state, payload) {
      state.player = payload;
    },

    setColor(state, { idx, value }) {
      const updateMoves = [...state.player.currentMove];
      updateMoves[idx] = value;
      state.player.currentMove = updateMoves;
    },

    setTurn(state) {
      state.player.moves.push(state.currentMove);
      state.player.currentMove = [];
    },
  },
};
