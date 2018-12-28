module.exports = function getId(lobbyId) {
  return `${lobbyId}-${(Math.random() * 5).toString(36).replace('.', '')}`;
};
