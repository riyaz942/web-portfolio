import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import projectReducer from './projectReducer';

const appReducer = history =>
  combineReducers({
    router: connectRouter(history),
    projectReducer,
  });

export default appReducer;
