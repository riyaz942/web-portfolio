import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import timelineReducer from './timelineReducer';

const appReducer = history =>
  combineReducers({
    router: connectRouter(history),
    timelineReducer,
  });

export default appReducer;
