// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = initializeApp({
//   apiKey: "AIzaSyAZ557gyMzfAXsmIbT7Toc6I32-YT2hsVk",
//   authDomain: "pareimpar-c724c.firebaseapp.com",
//   projectId: "pareimpar-c724c",
//   storageBucket: "pareimpar-c724c.appspot.com",
//   messagingSenderId: "259806426801",
//   appId: "1:259806426801:web:8d55f1f214394275425490",
//   measurementId: "G-LYK72HZH7T",
// });

// Initialize Firebase
// export const auth = getAuth(firebaseConfig);
// export const db = getFirestore(firebaseConfig);

//New
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYuTsxcn6guh-O561zM04TAwZP8-h_2A8",
  authDomain: "neweleven-c35d2.firebaseapp.com",
  databaseURL: "https://neweleven-c35d2-default-rtdb.firebaseio.com",
  projectId: "neweleven-c35d2",
  storageBucket: "neweleven-c35d2.appspot.com",
  messagingSenderId: "460766285582",
  appId: "1:460766285582:web:8999966c2ac4672361915f",
  measurementId: "G-58SKKT8ZWY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// export const db = getDatabase(firebaseConfig);
