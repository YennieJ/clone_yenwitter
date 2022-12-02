import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "service/fbase";

import * as S from "./Profile.styled";

interface ProfileProps {
  userObj: any;
  refreshUser: () => void;
}
const Profile = ({ userObj, refreshUser }: ProfileProps) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState<any>(
    userObj.displayName || ""
  );
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  // const getMyYenweets = async () => {
  //   const yenweets = await dbService
  //     .collection("yenweets")
  //     .where("createrId", "==", userObj.uid)
  //     .orderBy("createdAt")
  //     .get();
  //   console.log(yenweets.docs.map((doc) => doc.data()));
  // };
  // useEffect(() => {
  //   getMyYenweets();
  // });
  return (
    <S.Container>
      <S.Form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
        />
        <button type="submit">Update Profile</button>
      </S.Form>
      <button onClick={onLogOutClick}>Log Out</button>
    </S.Container>
  );
};

export default Profile;
