import GlobalStyle from "Grobal.styled";
import React, { useEffect, useState } from "react";

import { authService } from "service/fbase";

import AppRouter from "./components/Router/Router";

const App = () => {
  const [init, setInit] = useState(false);
  // const [isLogedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<any>(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args: any) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    user &&
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args: any) => user.updateProfile(args),
      });
  };
  return (
    <div>
      <GlobalStyle />
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLogedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default App;
