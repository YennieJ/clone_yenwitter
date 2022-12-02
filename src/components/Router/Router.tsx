import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Profile from "routes/Profile/Profile";
import Auth from "routes/Auth/Auth";
import Home from "routes/Home/Home";
import Navigation from "../Navigation/Navigation";

import * as S from "./Router.styled";

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
          <S.Container>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
          </S.Container>
        ) : (
          <>
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
