import UserContext from "../Context/UserProvider";
import { useContext } from "react";

const useUserHook = () => {
  return useContext(UserContext);
};

export default useUserHook;
