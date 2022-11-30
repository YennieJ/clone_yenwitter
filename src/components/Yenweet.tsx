import React, { useState } from "react";

import { YenweetsType } from "routes/Home";
import { dbService } from "service/fbase";

interface YenweetProps {
  yenweetObj: YenweetsType;
  isOwner: boolean;
}

const Yenweet = ({ yenweetObj, isOwner }: YenweetProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newYenweet, setNewYenweet] = useState<string>(yenweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("you wanna delete?");
    if (ok) {
      await dbService.doc(`yenweets/${yenweetObj.id}`).delete();
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dbService.doc(`yenweets/${yenweetObj.id}`).update({
      text: newYenweet,
    });
    setEditing(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewYenweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Yenweet"
              value={newYenweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={() => setEditing((prev) => !prev)}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{yenweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={() => setEditing((prev) => !prev)}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Yenweet;
