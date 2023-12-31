import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import authReducer from './authReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const authConfig = {
  ...commonConfig,
  key: 'auth',
  whitelist: ['isLoggedIn', 'token'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
