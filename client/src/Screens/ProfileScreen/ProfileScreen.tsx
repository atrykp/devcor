import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import TabelInfo from "../../components/TabelInfo/TabelInfo";
import { UserCtx } from "../../context/UserContext";
import "./ProfileScreen.scss";

export const USER = gql`
  query UserQuery($id: ID!) {
    getUser(id: $id) {
      name
      email
      id
    }
  }
`;

export default function ProfileScreen() {
  const { id } = useParams<{ id: string }>();
  const user = useContext(UserCtx);

  const { loading, error, data } = useQuery(USER, {
    variables: { id },
  });

  useEffect(() => {
    if (!data) return;
    const {
      getUser: { name, email, id },
    } = data;
    user.setUserData({ name, email, id });
  }, [data]);

  return (
    <div className="profile-screen">
      <h1 className="screen-header">Profile Screen</h1>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <TabelInfo
          data={{ name: data.getUser.name, email: data.getUser.email }}
        />
      )}
    </div>
  );
}
