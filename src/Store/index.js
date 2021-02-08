import { combineReducers, createStore } from 'redux';


import connection from './reducers/connection';

export default createStore(
  combineReducers({
    connection,
  }),
);
