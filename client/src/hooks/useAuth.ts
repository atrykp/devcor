import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { IUserData, UserCtx } from "../context/UserContext";

const ISAUTH = gql`
  query IsUserAuth {
    isUserAuth {
      id
      email
      name
    }
  }
`;

export const useAuth = () => {
  const [user, setUser] = useState<IUserData>();
  const ctx = useContext(UserCtx);
  const { loading, error, data } = useQuery(ISAUTH);
  console.log(data);

  useEffect(() => {
    if (!data?.isUserAuth) return;
    const {
      isUserAuth: { id, email, name },
    } = data;
    ctx.setUserData({ id, email, name });
    setUser({ id, email, name });
  }, [data]);

  return [loading, user];
};
