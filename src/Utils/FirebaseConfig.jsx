import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7Duu3bn_ftTmYYbld3_YCqOQmlT8yoz8",
  authDomain: "zc-tour-map-app.firebaseapp.com",
  projectId: "zc-tour-map-app",
  storageBucket: "zc-tour-map-app.appspot.com",
  messagingSenderId: "777550242394",
  appId: "1:777550242394:web:027dec1c66bff91f40ae63",
  measurementId: "G-QZHNLMQY79",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const UserCollectionReferrence = collection(db, "users");
export const TouristCollectionReferrence = collection(db, "tourist_spots_tbl");
export const HotelCollectionReferrence = collection(db, "hotel_tbl");
export const RestaurantCollectionReferrence = collection(db, "restaurant_tbl");
export const DevelopersCollectionReferrence = collection(db, "developers");
