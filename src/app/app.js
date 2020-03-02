import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import styles from "./app.scss";
import Intro from "./modules/intro/intro";
import Landing from "./modules/landing/landing";
import ProjectDetailsPage from "./modules/projectDetailsPage";
import Div from "Common/components/div";
import Loader from "./modules/loader/loader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { configureStore, history } from "./redux/store/store.dev";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Div className={styles.main_container}>
          <Loader>
            <Router>
              <Switch>
                <Route path="/">
                  <Landing />
                  <Route exact path="/project/:projectSlug?" component={ProjectDetailsPage} />
                </Route>
              </Switch>
            </Router>
          </Loader>
        </Div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
