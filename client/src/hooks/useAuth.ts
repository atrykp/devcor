import { useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { IUserData, UserCtx } from "../context/UserContext";

const ISAUTH = gql`
  query IsUserAuth {
    isUserAuth {
      id
      email
      name
      nativeLanguage
      learnLanguage
    }
  }
`;

export const useAuth = (protect: string) => {
  const [user, setUser] = useState<IUserData>({
    name: "",
    email: "",
    id: "",
    language: { native: "", learn: "" },
  });
  const ctx = useContext(UserCtx);
  const { loading, error, data } = useQuery(ISAUTH, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (!data?.isUserAuth && protect === "unprotected") {
      return;
    } else if (!data?.isUserAuth && protect === "protect") {
      return history.push("/authorization/login");
    } else if (data?.isUserAuth && protect === "unprotected") {
      return history.push(`/profile/${data.isUserAuth.id}`);
    } else if (ctx.id === data.isUserAuth.id) return;

    const {
      isUserAuth: { id, email, name, nativeLanguage, learnLanguage },
    } = data;
    ctx.setUserData({
      id,
      email,
      name,
      language: { native: nativeLanguage, learn: learnLanguage },
    });
    setUser({
      id,
      email,
      name,
      language: { native: nativeLanguage, learn: learnLanguage },
    });
  }, [data, protect, history, ctx, loading]);

  return [loading, user];
};
