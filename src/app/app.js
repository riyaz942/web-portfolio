import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import styles from "./app.scss";
import Intro from "./modules/intro/intro";

import Div from "Common/components/div";
import Loader from "./modules/loader/loader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { configureStore, history } from "./redux/store/store.dev";
import { Transition } from "react-spring/renderprops";
const Landing = React.lazy(() => import("./modules/landing/landing"));
const ProjectDetailsPage = React.lazy(() =>
  import("./modules/projectDetailsPage")
);

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Div className={styles.main_container}>
          <Loader>
            <Router>
              <Suspense fallback={null}>
                <Switch>
                  <Route path="/">
                    <Landing />
                    <Route
                      exact
                      path="/project/:projectSlug?"
                      children={({ match, ...rest }) => {
                        return (
                          <Transition
                            items={
                              match && match.params && match.params.projectSlug
                            }
                            from={{ opacity: 1 }}
                            enter={{ opacity: 1 }}
                            leave={{ opacity: 0 }}
                          >
                            {item =>
                              item &&
                              (props => (
                                <ProjectDetailsPage
                                  style={props}
                                  match={match}
                                  {...rest}
                                />
                              ))
                            }
                          </Transition>
                        );
                      }}
                    />
                  </Route>
                </Switch>
              </Suspense>
            </Router>
          </Loader>
        </Div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
