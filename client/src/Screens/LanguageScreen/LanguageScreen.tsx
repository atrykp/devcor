import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button, { MenuButton } from "../../components/Button/Button";

import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import LanguageBar from "../../components/LanguageBar/LanguageBar";
import LanguageContainer from "../../components/LanguageContainer/LanguageContainer";
import Modal from "../../components/Modal/Modal";
import TopBar from "../../components/TopBar/TopBar";
import { UserCtx } from "../../context/UserContext";
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
type Inputs = {
  to: string;
  from: string;
};

const LanguageScreen = () => {
  const [isMenuList, setIsMenuList] = useState(false);
  const [isAddWord, setIsAddWord] = useState(false);
  useAuth("protect");
  const ctx = useContext(UserCtx);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="language-screen">
      <LanguageBar />
      <Card>
        <LanguageContainer>
          {isAddWord && (
            <Modal
              title={"Add Word"}
              confirmTxt={"save"}
              cancelTxt={"cancel"}
              cancelCallback={() => setIsAddWord(false)}
              confirmCallback={() => handleSubmit(onSubmit)}
            >
              <div className="modal__inputs">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    placeholder={`${ctx.language.learn}`}
                    {...register("to", { required: true })}
                  />
                  <Input
                    placeholder={`${ctx.language.native}`}
                    {...register("from", { required: true })}
                  />
                </form>
              </div>
            </Modal>
          )}

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
              <MenuButton callback={() => setIsAddWord(true)}>
                add new word
              </MenuButton>
              <MenuButton>more...</MenuButton>
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
