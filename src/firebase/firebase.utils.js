import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCKe4d1We2QK6zQL5vfvGMIv6ZQjV-sQP0",
  authDomain: "crwn-db-940de.firebaseapp.com",
  databaseURL: "https://crwn-db-940de.firebaseio.com",
  projectId: "crwn-db-940de",
  storageBucket: "crwn-db-940de.appspot.com",
  messagingSenderId: "385317016500",
  appId: "1:385317016500:web:e01e75e6d7fb7a6d24d8e1",
  measurementId: "G-G07KZY8XM7"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
