import Yenweet from "components/Yenweet";
import React, { useEffect, useState } from "react";
import { dbService } from "service/fbase";

interface HomeProps {
  userObj: any;
}

export interface YenweetsType {
  id: string;
  text: string;
  createdAt: number;
  createrId: any;
}
const Home = ({ userObj }: HomeProps) => {
  const [yenweet, setYenweet] = useState<string>("");
  const [yenweets, setYenweets] = useState<any>([]);

  useEffect(() => {
    dbService
      .collection("yenweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const yenweetsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setYenweets(yenweetsArray);
      });
  }, []);

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dbService.collection("yenweets").add({
      text: yenweet,
      createdAt: Date.now(),
      createrId: userObj.uid,
    });
    setYenweet("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setYenweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={yenweet}
          type="text"
          placeholder="What's on your mind"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="yenweet" />
      </form>
      <div>
        {yenweets.map((yenweet: YenweetsType) => (
          <Yenweet
            key={yenweet.id}
            yenweetObj={yenweet}
            isOwner={yenweet.createrId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
