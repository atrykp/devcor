import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import _ from "lodash";

import AddWordModal from "../../components/AddWordModal/AddWordModal";
import { MenuButton } from "../../components/Button/Button";

import Card from "../../components/Card/Card";

import LanguageBar from "../../components/LanguageBar/LanguageBar";
import LanguageContainer from "../../components/LanguageContainer/LanguageContainer";

import TopBar from "../../components/TopBar/TopBar";
import WordElement, {
  IWordElement,
} from "../../components/WordElement/WordElement";
import WordsList from "../../components/WordsLlist/WordsList";
import { LanguageCtx } from "../../context/LanguageContext";

import { useAddWord } from "../../hooks/useAddWord";
import { useAuth } from "../../hooks/useAuth";

import "./LanguageScreen.scss";
import { NotebookCtx } from "../../context/NotebookContext";

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

const LanguageScreen = () => {
  useAuth("protect");
  const [isMenuList, setIsMenuList] = useState(false);

  const [randomWord, setRandomWord] = useState<IWordElement>();

  const { isAddWord, handleAddWordModal, ctx, ...config } = useAddWord();

  const langCtx = useContext(LanguageCtx);
  const noteCtx = useContext(NotebookCtx);

  const history = useHistory();

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
            <AddWordModal
              ctx={ctx}
              handleAddWordModal={handleAddWordModal}
              {...config}
            />
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
              <MenuButton
                callback={() => {
                  setIsMenuList(false);
                  handleAddWordModal(true);
                }}
              >
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
        <TopBar
          title="Flashcards"
          moreText
          onMore={() => history.push("/language/flashcards")}
        ></TopBar>
      </Card>
    </div>
  );
};

export default LanguageScreen;
