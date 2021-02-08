import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { updateConnection } from '../../Store/actions/connection';
import useConnectToSockNamespace from '../Hooks/socketConnect';


const Lobby = () => {
  const socket = useConnectToSockNamespace('join');
  const [lobbyShortName, setLobbyShortName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.emit('init_game_lobby', ({ lobbyName, gameId }) => {
        console.error(lobbyName, gameId);
        setLobbyShortName(lobbyName);
        dispatch(updateConnection({ lobbyName, gameId }));
      });
    }
  }, [socket, dispatch]);
  return (
    <div>{lobbyShortName}</div>
  );
};

// Join.propTypes = {
// };

export default Lobby;
