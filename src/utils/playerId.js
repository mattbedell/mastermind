const uuidv5 = require('uuid/v5');


function getUserId(username, gameId) {
  return uuidv5(username, gameId);
}


module.exports = {
  getUserId,
};
