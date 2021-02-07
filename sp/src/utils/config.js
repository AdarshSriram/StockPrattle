
import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "stockprattle.firebaseapp.com",
  databaseURL: "https://stockprattle.firebaseio.com",
  projectId: "stockprattle",
  storageBucket: "stockprattle.appspot.com",
  messagingSenderId: "867437344780",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-75LCH0YZ91"
};
const fire = firebase.initializeApp(config);
export default fire;
