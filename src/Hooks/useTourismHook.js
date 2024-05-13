import { TouristCollectionReferrence } from "../Utils/FirebaseConfig";
import { getDocs, query, limit } from "firebase/firestore";
import { create } from "zustand";

const useTourismHook = create((set) => ({
  tourismLimited: [],
  tourisms: [],
  fetchTourismLimited: (callback) => {
    if (localStorage.getItem("tourismLimited") !== null) {
      set(() => ({
        tourismLimited: JSON.parse(localStorage.getItem("tourismLimited")),
      }));
      callback("success");
      return;
    }

    const limitedTouristQuery = query(TouristCollectionReferrence, limit(3));

    getDocs(limitedTouristQuery)
      .then((querySnapshot) => {
        const tourismLimitedData = querySnapshot.docs.map((doc) => doc.data());
        set(() => ({ tourismLimited: tourismLimitedData }));
        localStorage.setItem(
          "tourismLimited",
          JSON.stringify(tourismLimitedData)
        );
        callback("sucesss");
      })
      .catch((err) => {
        callback(err.code);
      });
  },
  fetchTourism: (callback) => {
    if (localStorage.getItem("tourisms") !== null) {
      set(() => ({
        tourisms: JSON.parse(localStorage.getItem("tourisms")),
      }));
      callback("success");
      return;
    }

    getDocs(TouristCollectionReferrence)
      .then((querySnapshot) => {
        const tourismData = querySnapshot.docs.map((doc) => doc.data());
        set(() => ({ tourisms: tourismData }));
        localStorage.setItem("tourisms", JSON.stringify(tourismData));
        callback("sucesss");
      })
      .catch((err) => {
        callback(err.code);
      });
  },
}));

export default useTourismHook;
