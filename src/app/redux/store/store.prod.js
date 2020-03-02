// @flow
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import rootReducer from "../reducers";

const history = createBrowserHistory();
const enhancer = applyMiddleware(
  thunk,
);

function configureStore(initialState) {
  return createStore(rootReducer(history), initialState, enhancer);
}

export default { configureStore, history };
