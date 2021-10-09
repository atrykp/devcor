import { useContext } from "react";
import { useHistory, useParams } from "react-router";
import gql from "graphql-tag";

import { UserCtx } from "../../context/UserContext";
import { useAuth } from "../../hooks/useAuth";

import TabelInfo from "../../components/TabelInfo/TabelInfo";

import "./ProfileScreen.scss";

export default function ProfileScreen() {
  useAuth("protect");
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
