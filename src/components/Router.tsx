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
  userObj: any;
  refreshUser: () => void;
}
const AppRouter = ({ isLogedIn, userObj, refreshUser }: AppRouterProps) => {
  return (
    <Router>
      {isLogedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLogedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
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
