import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import Button from "../../components/Button/Button";

import Card from "../../components/Card/Card";
import LanguageBar from "../../components/LanguageBar/LanguageBar";
import LanguageContainer from "../../components/LanguageContainer/LanguageContainer";
import TopBar from "../../components/TopBar/TopBar";
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
  useAuth("protect");
  return (
    <div className="language-screen">
      <LanguageBar />
      <Card>
        <LanguageContainer>
          <p className="language-screen__section-header">Dictionary</p>
          <TopBar>
            <Button>Add new word</Button>
            <Button>search</Button>
            <Button>add words from text</Button>
          </TopBar>
          <div className="language-screen__dictionary"></div>
        </LanguageContainer>
      </Card>
      <Card>Flashcards</Card>
      <Card>Repeat</Card>
    </div>
  );
};

export default LanguageScreen;
