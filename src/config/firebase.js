import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAR9YaFrNqYJfWWC1lpFBXREZHwmplFq0I",
  authDomain: "teamb-d552c.firebaseapp.com",
  projectId: "teamb-d552c",
  storageBucket: "teamb-d552c.appspot.com",
  messagingSenderId: "774448339165",
  appId: "1:774448339165:web:2109b3ff244812d66b6334",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
