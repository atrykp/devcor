import { gql, useMutation } from "@apollo/client";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router";
import { MenuButton } from "../../components/Button/Button";

import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import LanguageBar from "../../components/LanguageBar/LanguageBar";
import LanguageContainer from "../../components/LanguageContainer/LanguageContainer";
import Modal from "../../components/Modal/Modal";
import TopBar from "../../components/TopBar/TopBar";
import WordElement, {
  IWordElement,
} from "../../components/WordElement/WordElement";
import WordsList from "../../components/WordsLlist/WordsList";
import { LanguageCtx } from "../../context/LanguageContext";
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
  mutation addWord(
    $userId: ID!
    $from: String
    $to: String
    $fromLang: String
    $toLang: String
  ) {
    addWord(
      userId: $userId
      from: $from
      to: $to
      fromLang: $fromLang
      toLang: $toLang
    ) {
      status
      message
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
  const [randomWord, setRandomWord] = useState<IWordElement>();

  const { showNotification } = useNotificationBar();

  const ctx = useContext(UserCtx);
  const langCtx = useContext(LanguageCtx);

  const [addWord] = useMutation(ADD_WORD, {
    refetchQueries: ["GetLanguageObj"],
  });

  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    showNotification("Adding word", "pending");
    const { data: saveResult } = await addWord({
      variables: {
        userId: ctx.id,
        from: data.from,
        to: data.to,
        fromLang: ctx.language.native,
        toLang: ctx.language.learn,
      },
    });
    if (!saveResult.addWord.status)
      return showNotification(saveResult.addWord.message, "error");
    showNotification(saveResult.addWord.message, "done");
    reset();
    setIsAddWord(false);
    setIsMenuList(false);
  };

  useEffect(() => {
    if (langCtx.userId && !randomWord) {
      const word =
        langCtx.dictionary[_.random(0, langCtx.dictionary.length - 1)];
      setRandomWord(word);
    }
  }, [randomWord, langCtx]);

  return (
    <div className="language-screen">
      <LanguageBar />
      <Card>
        <TopBar title="Repeat"></TopBar>
        {randomWord && (
          <WordElement
            from={randomWord.from}
            fromLang={randomWord.fromLang}
            to={randomWord.to}
            toLang={randomWord.toLang}
            id={randomWord.id}
          />
        )}
      </Card>
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
              <MenuButton callback={() => history.push("/language/dictionary")}>
                more...
              </MenuButton>
            </div>
          </TopBar>
          <div className="language-screen__dictionary">
            <WordsList>
              {langCtx.userId &&
                langCtx.dictionary.slice(-3).map((element: IWordElement) => {
                  const { from, to, fromLang, toLang, id } = element;
                  return (
                    <WordElement
                      key={id}
                      from={from}
                      to={to}
                      fromLang={fromLang}
                      toLang={toLang}
                      id={id}
                    />
                  );
                })}
            </WordsList>
          </div>
        </LanguageContainer>
      </Card>
      <Card>
        <TopBar title="FlashCards" moreText></TopBar>
      </Card>
    </div>
  );
};

export default LanguageScreen;
