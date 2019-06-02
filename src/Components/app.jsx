import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import Join from './Join';
import Lobby from './Lobby';

export default () => (
  <Router>
    <Route
      exact
      path="/"
      component={Home}
    />
    <Route
      exact
      path="/join"
      component={Join}
    />
    <Route
      path="/lobby"
      component={Lobby}
    />
  </Router>
);
