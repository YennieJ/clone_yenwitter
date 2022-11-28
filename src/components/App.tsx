import React from "react";
import firebase from "firebase/compat/app";
import AppRouter from "./AppRouter";
function App() {
  console.log(firebase);
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
