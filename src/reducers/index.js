import {combineReducers} from 'redux';
import userReducer from './userReducer';
import dataReducer from './dataReducer';

const appReducers = combineReducers({
  user: userReducer,
  data: dataReducer
});

export default appReducers;