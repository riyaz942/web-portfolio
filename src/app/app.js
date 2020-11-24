import React, { Suspense } from "react";
import styles from "./app.scss";
import Div from "Common/components/div";
import Loader from "./modules/loader/loader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AnimationLifecycle from 'Common/containers/animationLifecycle';

const PageTransitionExample = React.lazy(() => import("./examples/pageTransition"));
const Landing = React.lazy(() => import("./modules/landing/landing"));
const ProjectDetailsPage = React.lazy(() =>import("./modules/projectDetailsPage"));

const App = () => {
  return (
    <Div className={styles.main_container}>
      <Router>
        <Suspense fallback={null}>
          <Switch>
            <Route
              path="/example/pagetransition"
              component={PageTransitionExample}
            />

            <Route path="/">
              <Loader>
                <Landing />
                <Route 
                  exact
                  path="/project/:projectSlug?"
                  children={(props) => (
                    <AnimationLifecycle
                      component={ProjectDetailsPage}
                      whenToRender={(match)=>(match && match.params && match.params.projectSlug)}
                      {...props}
                    />
                  )}
                />
              </Loader>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Div>
  );
};

export default App;
