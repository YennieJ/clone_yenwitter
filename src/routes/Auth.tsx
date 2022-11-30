import React, { useState } from "react";
import { firebaseInstance, authService } from "service/fbase";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newAccount, setNewAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
        console.log(data);
      }
      // const data = newAccount
      //   ? await authService.createUserWithEmailAndPassword(email, password)
      //   : await authService.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      //에러메세지 좀 더 이쁘게하자
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;

    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    provider && (await authService.signInWithPopup(provider));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          required
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Login"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Log in" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
