import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useContext } from "react";
import { useParams } from "react-router";
import TabelInfo from "../../components/TabelInfo/TabelInfo";
import { UserCtx } from "../../context/UserContext";
import "./ProfileScreen.scss";

const data = {
  name: "patryk",
  email: "koko@Key",
  hello: "world",
  id: "123",
};

// export const USER = gql`
//   query UserQuery {
//     user(id:ID!){
//       name
//       email
//       id
//     }
//   }
// `;

export default function ProfileScreen() {
  const { id } = useParams<{ id: string }>();
  const user = useContext(UserCtx);

  return (
    <div className="profile-screen">
      <h1 className="screen-header">Profile Screen</h1>
      <TabelInfo data={data} />
    </div>
  );
}
