import { gql, useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MenuButton } from "../../components/Button/Button";

import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import LanguageBar from "../../components/LanguageBar/LanguageBar";
import LanguageContainer from "../../components/LanguageContainer/LanguageContainer";
import Modal from "../../components/Modal/Modal";
import TopBar from "../../components/TopBar/TopBar";
import WordElement from "../../components/WordElement/WordElement";
import WordsList from "../../components/WordsLlist/WordsList";
import { UserCtx } from "../../context/UserContext";
import { useAuth } from "../../hooks/useAuth";
import { useNotificationBar } from "../../hooks/useNotificationBar";
import "./LanguageScreen.scss";

// const UPDATE_USER = gql`
//   mutation updateUser(
//     $id: ID!
//     $email: String
//     $name: String
//     $password: String
//     $native: String
//     $learn: String
//   ) {
//     updateUser(
//       id: $id
//       email: $email
//       name: $name
//       password: $password
//       native: $native
//       learn: $learn
//     ) {
//       id
//       email
//       password
//       language {
//         native
//         learn
//       }
//     }
//   }
// `;
const ADD_WORD = gql`
  mutation addWord($userId: ID!, $from: String, $to: String) {
    addWord(userId: $userId, from: $from, to: $to) {
      status
      message
    }
  }
`;
const GET_LANGUAGE_OBJ = gql`
  query GetLanguageObj($userId: ID!) {
    getLanguageObj(userId: $userId) {
      userId
      dictionary {
        from
        to
      }
      flashcards {
        from
        fromLang
        to
        toLang
        iCan
      }
    }
  }
`;
type Inputs = {
  to: string;
  from: string;
};

const LanguageScreen = () => {
  useAuth("protect");
  const [isMenuList, setIsMenuList] = useState(false);
  const [isAddWord, setIsAddWord] = useState(false);

  const { showNotification } = useNotificationBar();
  const ctx = useContext(UserCtx);

  const { loading, error, data } = useQuery(GET_LANGUAGE_OBJ, {
    variables: { userId: ctx.id },
  });
  const [addWord, { data: addWordResponse }] = useMutation(ADD_WORD);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    showNotification("Adding word", "pending");
    const { data: saveResult } = await addWord({
      variables: { userId: ctx.id, from: data.from, to: data.to },
    });
    if (!saveResult.addWord.status)
      return showNotification(saveResult.addWord.message, "error");
    showNotification(saveResult.addWord.message, "done");
    reset();
    setIsAddWord(false);
    setIsMenuList(false);
  };

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
              cancelCallback={() => {
                reset();
                setIsAddWord(false);
              }}
              confirmCallback={() => handleSubmit(onSubmit)()}
            >
              <div className="modal__inputs">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    styles={errors?.to ? "input--error" : ""}
                    placeholder={`${ctx.language.learn}`}
                    {...register("to", { required: true })}
                  />
                  <Input
                    styles={errors?.from ? "input--error" : ""}
                    placeholder={`${ctx.language.native}`}
                    {...register("from", { required: true })}
                  />
                </form>
              </div>
            </Modal>
          )}

          <TopBar
            title={"Dictionary"}
            onMore={() => setIsMenuList((prevVal) => !prevVal)}
            moreIcon
          >
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
          <div className="language-screen__dictionary">
            <WordsList>
              <WordElement />
            </WordsList>
          </div>
        </LanguageContainer>
      </Card>
      <Card>
        <TopBar title="FlashCards" moreText></TopBar>
      </Card>
      <Card>
        <TopBar title="Repeat" moreText></TopBar>
      </Card>
    </div>
  );
};

export default LanguageScreen;
