import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import useConnectToSockNamespace from '../Hooks/socketConnect';


const Lobby = () => {
  const socket = useConnectToSockNamespace('game');
  return (
    <div></div>
  );
};

// Join.propTypes = {
// };

export default Lobby;
