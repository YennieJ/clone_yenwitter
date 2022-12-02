import React, { useState } from "react";
import { authService } from "service/fbase";
import * as S from "./AuthForm.styled";

const AuthForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newAccount, setNewAccount] = useState<boolean>(false);
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
      newAccount
        ? await authService.createUserWithEmailAndPassword(email, password)
        : await authService.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      //에러메세지 좀 더 이쁘게하자
      setError(error.message.replace("Firebase: ", ""));
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <S.AuthForm onSubmit={onSubmit}>
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
        <button type="submit">{newAccount ? "Create Account" : "Login"}</button>
        {error && <span>{error}</span>}
      </S.AuthForm>
      <S.AuthSwitch onClick={toggleAccount}>
        {newAccount ? "Log in" : "Create Account"}
      </S.AuthSwitch>
    </>
  );
};

export default AuthForm;
