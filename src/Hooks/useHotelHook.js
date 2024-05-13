import { HotelCollectionReferrence } from "../Utils/FirebaseConfig";
import { getDocs, query, limit } from "firebase/firestore";
import { create } from "zustand";

const useHotelHook = create((set) => ({
  hotelLimited: [],
  hotels: [],
  fetchHotelLimited: (callback) => {
    if (localStorage.getItem("hotelLimited") !== null) {
      set(() => ({
        hotelLimited: JSON.parse(localStorage.getItem("hotelLimited")),
      }));
      callback("success");
      return;
    }

    const limitedTouristQuery = query(HotelCollectionReferrence, limit(3));

    getDocs(limitedTouristQuery)
      .then((querySnapshot) => {
        const hotelLimitedData = querySnapshot.docs.map((doc) => doc.data());
        set(() => ({ hotelLimited: hotelLimitedData }));
        localStorage.setItem("hotelLimited", JSON.stringify(hotelLimitedData));
        callback("sucesss");
      })
      .catch((err) => {
        callback(err.code);
      });
  },
  fetchHotel: (callback) => {
    if (localStorage.getItem("hotels") !== null) {
      set(() => ({
        hotels: JSON.parse(localStorage.getItem("hotels")),
      }));
      callback("success");
      return;
    }

    getDocs(HotelCollectionReferrence)
      .then((querySnapshot) => {
        const hotelsData = querySnapshot.docs.map((doc) => doc.data());
        set(() => ({ hotels: hotelsData }));
        localStorage.setItem("hotels", JSON.stringify(hotelsData));
        callback("sucesss");
      })
      .catch((err) => {
        callback(err.code);
      });
  },
}));

export default useHotelHook;
