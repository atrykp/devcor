import React, { useState, createContext } from "react";

export interface IUserData {
  name: string;
  email: string;
  id: string;
  language: {
    native: string;
    learn: string;
  };
}

interface IUserCtx extends IUserData {
  setUserData(data: IUserData): void;
}

const emptyUser: IUserCtx = {
  name: "",
  email: "",
  id: "",
  language: {
    native: "",
    learn: "",
  },
  setUserData() {},
};

export const UserCtx = createContext(emptyUser);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserCtx>(emptyUser);

  const setUserData = (data: IUserData) => {
    const { email, name, id, language } = data;
    const newData = { email, name, id, language, setUserData };
    setUser(newData);
  };

  const context = {
    email: user.email,
    name: user.name,
    id: user.id,
    language: user.language,
    setUserData,
  };

  return <UserCtx.Provider value={context}>{children}</UserCtx.Provider>;
};

export default UserContext;
