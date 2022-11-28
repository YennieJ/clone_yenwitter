import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_API_API_KEY,
  authDomain: process.env.REACT_API_AUTH_DOMAIN,
  projectId: process.env.REACT_API_PROJUECT_ID,
  storageBucket: process.env.REACT_API_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_API_MESSAGING_SENDER_ID,
  appId: process.env.REACT_API_APP_ID,
};

const app = initializeApp(firebaseConfig);
export default app;
