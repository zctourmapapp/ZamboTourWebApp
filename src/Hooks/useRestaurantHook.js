import { RestaurantCollectionReferrence } from "../Utils/FirebaseConfig";
import { getDocs, query, limit } from "firebase/firestore";
import { create } from "zustand";

const useRestaurantHook = create((set) => ({
  restaurantLimited: [],
  restaurant: [],
  fetchRestaurantLimited: (callback) => {
    if (localStorage.getItem("restaurantLimited") !== null) {
      set(() => ({
        restaurantLimited: JSON.parse(
          localStorage.getItem("restaurantLimited")
        ),
      }));
      callback("success");
      return;
    }

    const limitedTouristQuery = query(RestaurantCollectionReferrence, limit(3));

    getDocs(limitedTouristQuery)
      .then((querySnapshot) => {
        const restaurantLimitedData = querySnapshot.docs.map((doc) =>
          doc.data()
        );
        set(() => ({ restaurantLimited: restaurantLimitedData }));
        localStorage.setItem(
          "restaurantLimited",
          JSON.stringify(restaurantLimitedData)
        );
        callback("sucesss");
      })
      .catch((err) => {
        callback(err.code);
      });
  },
  fetchRestaurant: (callback) => {
    if (localStorage.getItem("restaurant") !== null) {
      set(() => ({
        restaurant: JSON.parse(localStorage.getItem("restaurant")),
      }));
      callback("success");
      return;
    }

    getDocs(RestaurantCollectionReferrence)
      .then((querySnapshot) => {
        const restaurantLimitedData = querySnapshot.docs.map((doc) =>
          doc.data()
        );
        set(() => ({ restaurant: restaurantLimitedData }));
        localStorage.setItem(
          "restaurant",
          JSON.stringify(restaurantLimitedData)
        );
        callback("sucesss");
      })
      .catch((err) => {
        callback(err.code);
      });
  },
}));

export default useRestaurantHook;
