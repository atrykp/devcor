import React, { useState, createContext } from "react";

interface IUserCtx {
  name: string;
  email: string;
  id: string;
  setUserData(data: IUserData): void;
}

export interface IUserData {
  name: string;
  email: string;
  id: string;
}

const emptyUser: IUserCtx = {
  name: "",
  email: "",
  id: "",
  setUserData() {},
};

export const UserCtx = createContext(emptyUser);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserCtx>(emptyUser);

  const setUserData = (data: IUserData) => {
    const { email, name, id } = data;
    const newData = { email, name, id, setUserData };
    setUser(newData);
  };

  const context = {
    email: user.email,
    name: user.name,
    id: user.id,
    setUserData,
  };

  return <UserCtx.Provider value={context}>{children}</UserCtx.Provider>;
};

export default UserContext;
