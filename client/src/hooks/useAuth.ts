import { useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { IUserData, UserCtx } from "../context/UserContext";
import _ from "lodash";

const ISAUTH = gql`
  query IsUserAuth {
    isUserAuth {
      id
      email
      name
      language {
        native
        learn
      }
    }
  }
`;

export const useAuth = (protect: string) => {
  const commonObjElements = 4;
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
    } else {
      const common_elements = _.intersectionWith(
        Object.entries(ctx),
        Object.entries(data.isUserAuth),
        _.isEqual
      ).length;
      if (common_elements >= commonObjElements) return;
    }

    const {
      isUserAuth: { id, email, name, language },
    } = data;
    ctx.setUserData({
      id,
      email,
      name,
      language,
    });
    setUser({
      id,
      email,
      name,
      language,
    });
  }, [data, protect, history, ctx, loading]);

  return [loading, user];
};
