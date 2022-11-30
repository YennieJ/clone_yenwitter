import React, { useEffect, useState } from "react";

import { authService } from "service/fbase";

import AppRouter from "./Router";

const App = () => {
  const [init, setInit] = useState(false);
  // const [isLogedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<any>(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj(user);
      }
      // else {
      //   setIsLoggedIn(false);
      // }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? (
        <AppRouter isLogedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "loading..."
      )}
      <footer> &copy; {new Date().getFullYear()} Yenwitter</footer>
    </div>
  );
};

export default App;
