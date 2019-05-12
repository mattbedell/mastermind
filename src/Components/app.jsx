import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default () => (
  <Router>
    <Route
      exact
      path="/"
      render={() => (
        <Link to="/hello">Hello</Link>
      )}
    />
    <Route
      exact
      path="/hello"
      render={() => (
        <Link to="/">Home</Link>
      )}
    />
  </Router>
);
