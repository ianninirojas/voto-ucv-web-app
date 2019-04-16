import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
require("firebase/firestore");

/**
 * Production Credentials
 */
var config = {
  apiKey: "AIzaSyC0TRuN7JociCdqC_axI8yAXm-5lEcMjyQ",
  authDomain: "webapp-voto-ucv.firebaseapp.com",
  databaseURL: "https://webapp-voto-ucv.firebaseio.com",
  projectId: "webapp-voto-ucv",
  storageBucket: "webapp-voto-ucv.appspot.com",
  messagingSenderId: "641817567263"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export {
  storage,
  firestore,
  auth,
  timestamp
};