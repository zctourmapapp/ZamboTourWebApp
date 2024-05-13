import { auth, db } from "./FirebaseConfig";
import { addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import useUserHook from "../Hooks/UserContext";

export async function loginEmailAndPassword(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
  }
}

export async function registerEmailAndPassword(fname, lname, email, password) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db), {
      uid: user.id,
      first_name: fname,
      last_name: lname,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function sendRecoveryLink(email) {
  try {
    await sendPasswordResetEmail(auth, email);

    //Alert user on link send
  } catch (err) {
    console.log(err);
  }
}

export async function logoutUser() {
  try {
    signOut(auth);
    //Redirect user to log in Home page
  } catch (err) {
    console.log(err);
  }
}
