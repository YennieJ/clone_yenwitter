import React, { useState } from "react";
import { dbService, storageService } from "service/fbase";

import { v4 as uuidv4 } from "uuid";

import * as S from "./YenweetFactory.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

interface YenweetFactoryProps {
  userObj: any;
}
const YenweetFactory = ({ userObj }: YenweetFactoryProps) => {
  const [yenweet, setYenweet] = useState<string>("");
  const [attachment, setAttachment] = useState<string>("");

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    if (yenweet === "") {
      return;
    }
    e.preventDefault();

    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentURL = await response.ref.getDownloadURL();
    }

    const yenweetObj = {
      text: yenweet,
      createdAt: Date.now(),
      createrId: userObj.uid,
      attachmentURL,
    };
    await dbService.collection("yenweets").add(yenweetObj);

    setYenweet("");
    setAttachment("");
    e.target.reset();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setYenweet(value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    const theFile = files![0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
      const result = finishedEvent.target!.result as string;
      setAttachment(result);
      // const {currentTarget:{result}}=finishedEvent;
      // setAttachment(result)
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => setAttachment("");
  return (
    <S.Form onSubmit={onSubmit}>
      <S.InputContainer>
        <input
          value={yenweet}
          type="text"
          placeholder="What's on your mind"
          maxLength={120}
          onChange={onChange}
        />
        <button type="submit">&rarr;</button>
      </S.InputContainer>
      <label htmlFor="attach-file">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      {attachment && (
        <S.Attachment>
          <img src={attachment} alt="" />
          <button>
            <span onClick={onClearAttachmentClick}>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </S.Attachment>
      )}
    </S.Form>
  );
};

export default YenweetFactory;
