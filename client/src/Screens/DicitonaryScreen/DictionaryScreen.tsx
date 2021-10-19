import { useContext } from "react";
import Button, { MenuButton } from "../../components/Button/Button";
import WordElement, {
  IWordElement,
} from "../../components/WordElement/WordElement";
import { LanguageCtx } from "../../context/LanguageContext";
import { useAuth } from "../../hooks/useAuth";
import "./DictionaryScreen.scss";

const DictionaryScreen = () => {
  useAuth("protected");
  const langCtx = useContext(LanguageCtx);
  return (
    <div className="dictionary-screen">
      <p className="dictionary-screen__title">Dictionary</p>
      <div className="dictionary-screen__buttons">
        <MenuButton>Scan text</MenuButton>
        <MenuButton>Search</MenuButton>
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
    </div>
  );
};

export default DictionaryScreen;
