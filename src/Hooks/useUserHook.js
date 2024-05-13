import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { db, auth } from "../Utils/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { create } from "zustand";

const useUserHook = create((set) => ({
  user: null,
  signIn: (form, callback) => {
    const email = form["email"];
    const password = form["password"];
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;

        const documentRef = doc(db, "users", user.uid);
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data();
          set(() => ({ user: documentData }));

          if (!documentData.isApproved) {
            callback("pending");
            return;
          }

          localStorage.setItem("user", JSON.stringify(documentData));
          callback("success");
          return;
        }

        callback("No record");
      })
      .catch((err) => {
        console.log(err);
        callback(err.code);
      });
  },
  signUp: (form, password, callback) => {
    const email = form["email"];
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;

        const UserCollectionReference = doc(db, "User", user.uid);

        await setDoc(UserCollectionReference, form);
        callback("success");
      })
      .catch((err) => {
        callback(err.code);
      });
  },
  sendRecoveryLink: (email, callback) => {
    sendPasswordResetEmail(auth, email)
      .then(() => callback("success"))
      .catch((error) => callback(error.code));
  },
  checkToken: () => {
    if (localStorage.getItem("user")) {
      set(() => ({ user: JSON.parse(localStorage.getItem("user")) }));
    }
  },
}));

export default useUserHook;
