import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vpassword, setVPassword] = useState("");

  return (
    <UserContext.Provider
      value={{
        contact,
        email,
        fname,
        lname,
        password,
        vpassword,
        user,
        setContact,
        setEmail,
        setFname,
        setLname,
        setPassword,
        setVPassword,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
