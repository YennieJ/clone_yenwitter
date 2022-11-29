import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { authService } from "service/fbase";

import AppRouter from "./Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLogedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? <AppRouter isLogedIn={isLogedIn} /> : "loading..."}
      <footer> &copy; {new Date().getFullYear()} Yenwitter</footer>
    </div>
  );
}

export default App;
