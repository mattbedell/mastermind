import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';


const Home = () => (
  <div>
    <Link to="/join">
      <Button>Join A Lobby</Button>
    </Link>
    <Link to="/lobby">
      <Button>New Game</Button>
    </Link>
  </div>
);

export default Home;
