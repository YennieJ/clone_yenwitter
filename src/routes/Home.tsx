import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { dbService, storageService } from "service/fbase";
import { v4 as uuidv4 } from "uuid";
import Yenweet from "components/Yenweet";

interface HomeProps {
  userObj: any;
}

export interface YenweetsType {
  id: string;
  text: string;
  createdAt: number;
  createrId: any;
  attachmentURL?: string;
}
const Home = ({ userObj }: HomeProps) => {
  const [yenweet, setYenweet] = useState<string>("");
  const [yenweets, setYenweets] = useState<any>([]);
  const [attachment, setAttachment] = useState<string>("");

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

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  // const onClearAttachmentClick = () => setAttachment(null)

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="yenweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="" />
            <button onClick={onClearAttachmentClick}>Clear Photo</button>
          </div>
        )}
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

// import React, { ChangeEvent, useEffect, useState } from "react";
// import {
//   query,
//   collection,
//   orderBy,
//   onSnapshot,
//   addDoc,
// } from "firebase/firestore";
// import { ref, uploadString, getDownloadURL } from "firebase/storage";
// import { storageService, dbService } from "service/fbase";
// import { v4 as uuidv4 } from "uuid";
// import Yenweet from "components/Yenweet";

// interface HomeProps {
//   userObj: any;
// }

// export interface YenweetsType {
//   id: string;
//   text: string;
//   createdAt: number;
//   createrId: any;
//   attachmentURL?: string;
// }
// const Home = ({ userObj }: HomeProps) => {
//   const [yenweet, setYenweet] = useState<string>("");
//   const [yenweets, setYenweets] = useState<any>([]);
//   const [attachment, setAttachment] = useState<string>("");

//   useEffect(() => {
//     const q = query(
//       collection(dbService, "yenweets"),
//       orderBy("createdAt", "desc")
//     );
//     onSnapshot(q, (snapshot) => {
//       const yenweetsArray = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setYenweets(yenweetsArray);
//     });
//   }, []);

//   const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     let attachmentURL = "";
//     if (attachment !== "") {
//       const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
//       const response = await uploadString(attachmentRef, "data_url");

//       attachmentURL = await getDownloadURL(attachmentRef);
//     }
//     const yenweetObj = {
//       text: yenweet,
//       createdAt: Date.now(),
//       createrId: userObj.uid,
//       attachmentURL,
//     };
//     await addDoc(collection(dbService, "yenweets"), yenweetObj);

//     setYenweet("");
//     setAttachment("");
//   };

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { value },
//     } = e;
//     setYenweet(value);
//   };

//   const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { files },
//     } = e;
//     const theFile = files![0];
//     const reader = new FileReader();
//     reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
//       const result = finishedEvent.target!.result as string;
//       setAttachment(result);
//       // const {currentTarget:{result}}=finishedEvent;
//       // setAttachment(result)
//       // ?? currentTarget.files
//     };
//     reader.readAsDataURL(theFile);
//   };

//   const onClearAttachmentClick = () => setAttachment("");

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           value={yenweet}
//           type="text"
//           placeholder="What's on your mind"
//           maxLength={120}
//           onChange={onChange}
//         />
//         <input type="file" accept="image/*" onChange={onFileChange} />
//         <input type="submit" value="yenweet" />
//         {attachment && (
//           <div>
//             <img src={attachment} width="50px" height="50px" alt="" />
//             <button onClick={onClearAttachmentClick}>Clear Photo</button>
//           </div>
//         )}
//       </form>
//       <div>
//         {yenweets.map((yenweet: YenweetsType) => (
//           <Yenweet
//             key={yenweet.id}
//             yenweetObj={yenweet}
//             isOwner={yenweet.createrId === userObj.uid}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
