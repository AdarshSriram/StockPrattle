
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyD7_c5e4zdaJ5fgaSPHu2ypqv0UH5m49os",
  authDomain: "stockprattle.firebaseapp.com",
  databaseURL: "https://stockprattle.firebaseio.com",
  projectId: "stockprattle",
  storageBucket: "stockprattle.appspot.com",
  messagingSenderId: "867437344780",
  appId: "1:867437344780:web:4d94750a3fb5c19238d629",
  measurementId: "G-75LCH0YZ91"
};
const fire = firebase.initializeApp(config);
export default fire;
