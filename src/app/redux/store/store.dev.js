import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { createLogger } from "redux-logger";
import rootReducer from "../reducer";

export const history = createBrowserHistory();
export const configureStore = initialState => {
  // Redux Configurations
  const enhancers = [];

  // TODO If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers = compose;

  // Apply Middleware & Compose Enhancers
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(
      compose(
        applyMiddleware(
          thunk,
          createLogger()
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__() 
      )
    );  
  } else {
    enhancers.push(
      compose(
        applyMiddleware(
          thunk,
          createLogger()
        )
      )
    );  
  }

  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer(history), initialState, enhancer);

  if (module.hot) {
    module.hot.accept("../reducer", () =>
      store.replaceReducer(require("../reducer"))
    );
  }

  return store;
};
