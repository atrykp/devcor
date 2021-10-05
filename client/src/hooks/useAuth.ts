import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
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

export const useAuth = (protect: string) => {
  const [user, setUser] = useState<IUserData>({ name: "", email: "", id: "" });
  const ctx = useContext(UserCtx);
  const { loading, error, data, refetch } = useQuery(ISAUTH);

  const history = useHistory();
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (!data?.isUserAuth && protect === "unprotected") {
      return;
    } else if (!data?.isUserAuth && protect === "protect") {
      return history.push("/authorization/login");
    } else if (data?.isUserAuth && protect === "unprotected") {
      return history.push(`/profile/${data.isUserAuth.id}`);
    } else if (ctx.id === data.isUserAuth.id) return;

    const {
      isUserAuth: { id, email, name },
    } = data;
    ctx.setUserData({ id, email, name });
    setUser({ id, email, name });
  }, [data, protect, history, ctx, loading]);

  return [user, loading];
};
