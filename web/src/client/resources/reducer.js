import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'services/history.service';

import user from './user/user.reducer';


const reducers = {
  user,
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers,
});

export default rootReducer;
