import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import useConnectToSockNamespace from '../Hooks/socketConnect';

import Button from '../Button';

const Join = () => {
  const [lobbyCode, setLobbyCode] = useState('');
  /* eslint-disable no-unused-vars */
  const [codeLength, setCodeLength] = useState(1000);
  const [error, setError] = useState(null);
  const socket = useConnectToSockNamespace('join');

  const isValid = lobbyCode.length === codeLength;
  useEffect(() => {
    if (socket) {
      socket.emit('get_lobby_code_length', (lobbyCodeLength) => {
        setCodeLength(lobbyCodeLength);
      });
    }
  }, [socket]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={lobbyCode}
          onChange={e => setLobbyCode(e.target.value.toUpperCase())}
        />
        <Button
          disabled={!isValid}
          handleClick={(e) => {
            setError(null);
            if (socket) {
              socket.emit('get_game_id', { lobbyCode }, ({ gameId }, err) => {
                if (err) {
                  setError(err);
                }
                // redux store gameId
                // cookie store gameId for dropped connection recovery?
              });
            }
          }}
        >
          JOIN
        </Button>
      </div>
      <span>{error}</span>
    </div>
  );
};

// Join.propTypes = {
// };

export default Join;
