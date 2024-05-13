import { DevelopersCollectionReferrence } from "../Utils/FirebaseConfig";
import { getDocs } from "firebase/firestore";
import { create } from "zustand";

const useDeveloperHook = create((set) => ({
  developers: [],
  fetchDevelopers: (callback) => {
    if (localStorage.getItem("developers") !== null) {
      set(() => ({
        developers: JSON.parse(localStorage.getItem("developers")),
      }));
      callback("success");
      return;
    }

    getDocs(DevelopersCollectionReferrence)
      .then((querySnapshot) => {
        const developersData = querySnapshot.docs.map((doc) => doc.data());
        set(() => ({ developers: developersData }));
        localStorage.setItem("developers", JSON.stringify(developersData));
        callback("sucesss");
      })
      .catch((err) => {
        callback(err.code);
      });
  },
}));

export default useDeveloperHook;
