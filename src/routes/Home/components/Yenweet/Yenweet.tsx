import React, { useState } from "react";

import { YenweetsType } from "routes/Home/Home";
import { dbService, storageService } from "service/fbase";

import * as S from "./Yenweet.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
      yenweetObj.attachmentURL &&
        (await storageService.refFromURL(yenweetObj.attachmentURL).delete());
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
    <S.Yenweet>
      {editing ? (
        <>
          <S.EditForm onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Yenweet"
              value={newYenweet}
              required
              onChange={onChange}
            />
            <button type="submit">Update</button>
          </S.EditForm>
          <S.Button onClick={() => setEditing((prev) => !prev)}>
            Cancle
          </S.Button>
        </>
      ) : (
        <>
          <h4>{yenweetObj.text}</h4>
          {yenweetObj.attachmentURL && (
            <img alt="" src={yenweetObj.attachmentURL} />
          )}
          {isOwner && (
            <S.Action>
              <button onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={() => setEditing((prev) => !prev)}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </S.Action>
          )}
        </>
      )}
    </S.Yenweet>
  );
};

export default Yenweet;

// import React, { useState } from "react";

// import { YenweetsType } from "routes/Home";
// // import { dbService } from "service/fbase";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { storageService } from "service/fbase";

// interface YenweetProps {
//   yenweetObj: YenweetsType;
//   isOwner: boolean;
// }
// const db = getFirestore();
// const Yenweet = ({ yenweetObj, isOwner }: YenweetProps) => {
//   const [editing, setEditing] = useState<boolean>(false);
//   const [newYenweet, setNewYenweet] = useState<string>(yenweetObj.text);

//   const onDeleteClick = async () => {
//     const ok = window.confirm("you wanna delete?");
//     if (ok) {
//       await deleteDoc(doc(db, `yenweets/${yenweetObj.id}`));
//       await storageService.refFromURL(yenweetObj.attachmentURL!).delete();
//     }
//   };

//   const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await addDoc(collection(db, `yenweets/${yenweetObj.id}`), {
//       text: newYenweet,
//     });
//     // await dbService.doc(`yenweets/${yenweetObj.id}`).update({
//     //   text: newYenweet,
//     // });
//     setEditing(false);
//   };

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { value },
//     } = e;
//     setNewYenweet(value);
//   };
//   return (
//     <div>
//       {editing ? (
//         <>
//           <form onSubmit={onSubmit}>
//             <input
//               type="text"
//               placeholder="Edit your Yenweet"
//               value={newYenweet}
//               required
//               onChange={onChange}
//             />
//             <input type="submit" value="Update" />
//           </form>
//           <button onClick={() => setEditing((prev) => !prev)}>Cancle</button>
//         </>
//       ) : (
//         <>
//           <h4>{yenweetObj.text}</h4>
//           {yenweetObj.attachmentURL && (
//             <img
//               alt=""
//               src={yenweetObj.attachmentURL}
//               width="50px"
//               height="50px"
//             />
//           )}
//           {isOwner && (
//             <>
//               <button onClick={onDeleteClick}>Delete</button>
//               <button onClick={() => setEditing((prev) => !prev)}>Edit</button>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Yenweet;
