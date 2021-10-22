import { useContext } from "react";
import { useHistory } from "react-router";

import AddWordModal from "../../components/AddWordModal/AddWordModal";
import { MenuButton } from "../../components/Button/Button";
import WordElement, {
  IWordElement,
} from "../../components/WordElement/WordElement";

import { LanguageCtx } from "../../context/LanguageContext";

import { useAddWord } from "../../hooks/useAddWord";
import { useAuth } from "../../hooks/useAuth";

import "./DictionaryScreen.scss";

const DictionaryScreen = () => {
  useAuth("protect");
  const langCtx = useContext(LanguageCtx);
  const { isAddWord, handleAddWordModal, ctx, ...config } = useAddWord();
  const history = useHistory();

  return (
    <div className="dictionary-screen">
      <p className="dictionary-screen__title">Dictionary</p>
      <div className="dictionary-screen__buttons">
        <MenuButton callback={() => history.push("/language/scanText")}>
          Scan text
        </MenuButton>
        <MenuButton>Search</MenuButton>
        <MenuButton
          callback={() => {
            handleAddWordModal(true);
          }}
        >
          add
        </MenuButton>
      </div>
      <div className="dictionary-screen__words">
        {langCtx.dictionary.length > 0 ? (
          langCtx.dictionary.map((element: IWordElement) => (
            <WordElement {...element} key={element.id} />
          ))
        ) : (
          <p>its nothing here</p>
        )}
      </div>
      {isAddWord && (
        <AddWordModal
          ctx={ctx}
          handleAddWordModal={handleAddWordModal}
          {...config}
        />
      )}
    </div>
  );
};

export default DictionaryScreen;
