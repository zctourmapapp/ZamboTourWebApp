import { doc, getDocs, onSnapshot } from "firebase/firestore";
import {
  db,
  TouristCollectionReferrence,
  HotelCollectionReferrence,
  RestaurantCollectionReferrence,
  UserCollectionReferrence,
} from "./FirebaseConfig";

export const fetchAllTourismRecords = async () => {
  return await getDocs(TouristCollectionReferrence);
};

export const fetchAllHotelRecords = async () => {
  return await getDocs(HotelCollectionReferrence);
};

export const fetchAllRestaurantRecords = async () => {
  return await getDocs(RestaurantCollectionReferrence);
};

export const fetchAllUsersRecords = async () => {
  return await getDocs(UserCollectionReferrence);
};

export const fetchSingleRecord = async () => {
  return await getDocs(TouristCollectionReferrence);
};
