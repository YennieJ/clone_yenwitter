import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "service/fbase";

interface ProfileProps {
  userObj: any;
  refreshUser: () => void;
}
const Profile = ({ userObj, refreshUser }: ProfileProps) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
