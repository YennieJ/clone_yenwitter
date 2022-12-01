import React, { useEffect, useState } from "react";

import { authService } from "service/fbase";

import AppRouter from "./Router";

interface ProfileProps {
  displayName: string;
  photoURL?: string;
}
const App = () => {
  const [init, setInit] = useState(false);
  // const [isLogedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<any>(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      user &&
        // setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args: any) => user.updateProfile(args),
        });

      // else {
      //   setIsLoggedIn(false);
      // }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    user &&
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args: ProfileProps) => user.updateProfile(args),
      });
  };
  return (
    <div>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLogedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "loading..."
      )}
      <footer> &copy; {new Date().getFullYear()} Yenwitter</footer>
    </div>
  );
};

export default App;
