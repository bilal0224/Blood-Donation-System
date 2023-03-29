// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth';
// import {getFirestore} from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK8f9xs9_WNISBKPXrN98vvkkd_JBadRM",
  authDomain: "gifted-chat-dd412.firebaseapp.com",
  projectId: "gifted-chat-dd412",
  storageBucket: "gifted-chat-dd412.appspot.com",
  messagingSenderId: "700667205341",
  appId: "1:700667205341:web:b14cfe0983ff84ff82ed34"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const authentication = getAuth(app);

// export {db, authentication};

let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig)
}
else{
  app = firebase.app()
}

const db =app.firestore();
const auth = firebase.auth();
export {db,auth}