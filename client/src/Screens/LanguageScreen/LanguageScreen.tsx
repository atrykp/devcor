import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";

import Card from "../../components/Card/Card";
import LanguageBar from "../../components/LanguageBar/LanguageBar";
import { useAuth } from "../../hooks/useAuth";
import "./LanguageScreen.scss";

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $email: String
    $name: String
    $password: String
    $native: String
    $learn: String
  ) {
    updateUser(
      id: $id
      email: $email
      name: $name
      password: $password
      native: $native
      learn: $learn
    ) {
      id
      email
      password
      language {
        native
        learn
      }
    }
  }
`;

const LanguageScreen = () => {
  const [updateUserData, { loading, error, data }] = useMutation(UPDATE_USER);
  useEffect(() => {
    updateUserData({ variables: { id: "33" } });
  }, []);

  useAuth("protect");
  return (
    <div className="language-screen">
      <LanguageBar />
      <Card>Dictionary</Card>
      <Card>Flashcards</Card>
      <Card>Repeat</Card>
    </div>
  );
};

export default LanguageScreen;
