import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { updateConnection } from '../../Store/actions/connection';
import useConnectToSockNamespace from '../Hooks/socketConnect';

import Button from '../Button';

const JoinPlayer = () => {
  const [lobbyName, setLobbyName] = useState('');
  /* eslint-disable no-unused-vars */
  const [codeLength, setCodeLength] = useState(1000);
  const [error, setError] = useState(null);
  const gameIdStore = useSelector(state => state.connection.gameId);
  const socket = useConnectToSockNamespace('join');

  const isValid = lobbyName.length === codeLength;
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket) {
      socket.emit('get_lobby_code_length', (lobbyCodeLength) => {
        setCodeLength(lobbyCodeLength);
      });
    }
  }, [socket, dispatch]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={lobbyName}
          onChange={e => setLobbyName(e.target.value.toUpperCase())}
        />
        <Button
          disabled={!isValid || !!gameIdStore}
          handleClick={(e) => {
            setError(null);
            if (socket) {
              socket.emit('get_game_id', { lobbyName }, ({ gameId }, err) => {
                if (err) {
                  setError(err);
                  return;
                }

                dispatch(updateConnection({ gameId, lobbyName }));
                // cookie store gameId for dropped connection recovery?
              });
            }
          }}
        >
          FIND LOBBY
        </Button>
      </div>
      <span>{error}</span>
    </div>
  );
};

// Join.propTypes = {
// };

export default JoinPlayer;
