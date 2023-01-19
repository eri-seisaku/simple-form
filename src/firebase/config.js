import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBnM6PTLtnO1juNgk4a7z1kZkTzxEt5u-Y",
  authDomain: "my-vue2-firebase8-app.firebaseapp.com",
  projectId: "my-vue2-firebase8-app",
  storageBucket: "my-vue2-firebase8-app.appspot.com",
  messagingSenderId: "108217611188",
  appId: "1:108217611188:web:7370e6c822c4e832e7b8e1"
};

  // init firebase app
  firebase.initializeApp(firebaseConfig)

  // init firestore
  const db = firebase.firestore()

  export { db }