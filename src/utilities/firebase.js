import { useCallback, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  onValue,
  ref,
  update,
  connectDatabaseEmulator,
} from "firebase/database";

import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithCredential
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR3DJr9r-_X8d9S5QZHEYdzulbeY-A2rk",
  authDomain: "react-tutorial-92870.firebaseapp.com",
  databaseURL: "https://react-tutorial-92870-default-rtdb.firebaseio.com",
  projectId: "react-tutorial-92870",
  storageBucket: "react-tutorial-92870.appspot.com",
  messagingSenderId: "540973868538",
  appId: "1:540973868538:web:670eafeb9823a4ecbf7043",
  measurementId: "G-RZ5SF2LRQX",
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);


if (import.meta.env.VITE_EMULATE) {
  console.log("vite_emulator is true")
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
  signInWithCredential(
    auth,
    GoogleAuthProvider.credential(
      '{"sub": "chpaPUJxZKwOhyHgq30r99sM40Vj", "email": "user1@gmail.com", "displayName":"user1", "email_verified": true}'
    )
  );
}

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser));

  return [user];
};

// if (process.env.REACT_APP_EMULATE) {
//   connectAuthEmulator(auth, "http://127.0.0.1:9099");
//   connectDatabaseEmulator(db, "127.0.0.1", 9000);

//   signInWithCredential(auth, GoogleAuthProvider.credential(
//     '{"sub": "8mtLeXuRP7jyEksE6wAk8SKaRJUU", "email": "user1@gmail.com", "displayName":"user1", "email_verified": true}'
//   ));
// }


