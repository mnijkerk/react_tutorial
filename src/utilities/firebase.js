import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyDR3DJr9r-_X8d9S5QZHEYdzulbeY-A2rk",
  authDomain: "react-tutorial-92870.firebaseapp.com",
  databaseURL: "https://react-tutorial-92870-default-rtdb.firebaseio.com",
  projectId: "react-tutorial-92870",
  storageBucket: "react-tutorial-92870.appspot.com",
  messagingSenderId: "540973868538",
  appId: "1:540973868538:web:670eafeb9823a4ecbf7043",
  measurementId: "G-RZ5SF2LRQX"
};



const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};