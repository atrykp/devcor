import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import TabelInfo from "../../components/TabelInfo/TabelInfo";
import { UserCtx } from "../../context/UserContext";
import { useAuth } from "../../hooks/useAuth";
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
  console.log(id);

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
