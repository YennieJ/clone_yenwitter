import React from "react";
import { authService, firebaseInstance } from "service/fbase";

import AuthForm from "routes/Auth/components/AuthForm/AuthForm";

import * as S from "./Auth.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
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
    <S.Container>
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <S.SocialAction>
        <button onClick={onSocialClick} name="google">
          continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github">
          continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </S.SocialAction>
    </S.Container>
  );
};

export default Auth;
