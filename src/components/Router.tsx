import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";

interface AppRouterProps {
  isLogedIn: boolean;
}
const AppRouter = ({ isLogedIn }: AppRouterProps) => {
  return (
    <Router>
      {isLogedIn && <Navigation />}
      <Switch>
        {isLogedIn ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
          </>
        ) : (
          <>
            {" "}
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
