import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import useConnectToSockNamespace from '../Hooks/socketConnect';


const Lobby = () => {
  const socket = useConnectToSockNamespace('join');

  useEffect(() => {
    if (socket) {
      socket.emit('init_game_lobby', ({ lobbyName, gameId }) => {

      });
    }
  }, [socket]);
  return (
    <div></div>
  );
};

// Join.propTypes = {
// };

export default Lobby;
