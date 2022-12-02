import React from "react";

import * as S from "./Navigation.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface NavProps {
  userObj: any;
}
const Navigation = ({ userObj }: NavProps) => (
  <S.Container>
    <li>
      <S.LinkHome to="/">
        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
      </S.LinkHome>
    </li>
    <li>
      <S.LinkProfile to="/profile">
        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
        <span>
          {userObj.displayName ? `${userObj.displayName}의 Profile` : "Profile"}
        </span>
      </S.LinkProfile>
    </li>
  </S.Container>
);
export default Navigation;
