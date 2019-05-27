const uuidv4 = require('uuid/v4');

// https://stackoverflow.com/a/1349426
function getLobbyName(idLength) {
  const allLeters = 'abcdefghijklmnopqrstuvwkyz';
  let result = '';

  for (let i = 0; i < idLength; i += 1) {
    result += allLeters.charAt(Math.floor(Math.random() * allLeters.length));
  }

  return result.toUpperCase();
}

function getLobbyId() {
  return uuidv4();
}

module.exports = {
  getLobbyName,
  getLobbyId,
};
