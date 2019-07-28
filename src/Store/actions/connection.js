/* eslint-disable-next-line import/prefer-default-export */
export const updateConnection = ({ gameId, lobbyName }) => ({
  type: 'SET_CONNECTION_INFO',
  payload: {
    gameId,
    lobbyName,
  },
});
