import { useContext } from "react";
import { useParams } from "react-router";
import gql from "graphql-tag";

import { UserCtx } from "../../context/UserContext";
import { useAuth } from "../../hooks/useAuth";

import TabelInfo from "../../components/TabelInfo/TabelInfo";

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
  useAuth("protect");
  const { id } = useParams<{ id: string }>();

  const user = useContext(UserCtx);

  return (
    <div className="profile-screen">
      <h1 className="screen-header">Profile Screen</h1>
      {!user.id ? (
        <h1>loading...</h1>
      ) : (
        <TabelInfo data={{ name: user.name, email: user.email }} />
      )}
    </div>
  );
}
