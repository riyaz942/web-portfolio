import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

const appReducer = history =>
  combineReducers({
    router: connectRouter(history),
  });

export default appReducer;
