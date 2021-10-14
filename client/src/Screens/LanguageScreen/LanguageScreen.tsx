import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Button, { MenuButton } from "../../components/Button/Button";

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
  const [isMenuList, setIsMenuList] = useState(false);
  useAuth("protect");
  return (
    <div className="language-screen">
      <LanguageBar />
      <Card>
        <LanguageContainer>
          <TopBar>
            <p className="language-screen__section-header">Dictionary</p>
            <i
              className="fas fa-ellipsis-v language-screen__menu-icon"
              onClick={() => setIsMenuList((prevVal) => !prevVal)}
            ></i>
            <div
              className={`language-screen__buttons ${
                isMenuList ? "language-screen__buttons--mobile" : ""
              }`}
            >
              <MenuButton>add new word</MenuButton>
              <MenuButton>search</MenuButton>
              <MenuButton>add words from text</MenuButton>
            </div>
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
