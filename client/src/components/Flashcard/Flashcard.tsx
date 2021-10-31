import { useState } from "react";
import { MenuButton } from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import "./Flashcard.scss";

type FlashcardsSite = "front" | "back";

interface IFlashcard {
  data: {
    date: string;
    iCan: boolean;
    from: string;
    to: string;
    fromWord: string;
    toWord: string;
  };
}

const Flashcard = ({ data }: IFlashcard) => {
  const [currentSite, setCurrentSite] = useState<FlashcardsSite>("front");
  const { from, to, date, fromWord, toWord, iCan } = data;
  const changeSite = () => {
    if (currentSite === "front") return setCurrentSite("back");
    setCurrentSite("front");
  };
  return (
    <div
      className={`flashcard ${currentSite === "back" ? "flashcard--back" : ""}`}
    >
      <div className="flashcard__text-wrapper">
        <p className="flashcard__text-language">
          {currentSite === "front" ? from : to}
        </p>
        <div
          className={`flashcard__translation ${
            currentSite === "back" ? "flashcard__translation--back" : ""
          }`}
        >
          <p className="flashcard__text">
            {currentSite === "front" ? fromWord : toWord}
          </p>
        </div>
      </div>
      <div className="flashcard__buttons">
        <div className="flashcard__can-button">
          <MenuButton styles="flashcard__button">iCan</MenuButton>
          {iCan && <i className="fas fa-check flashcard__can-symbol"></i>}
        </div>
        <IconButton
          styles="button--round flashcard__button-turn-over"
          callback={changeSite}
        >
          <i className="fas fa-sync-alt"></i>
        </IconButton>
        <MenuButton styles="flashcard__button">remove</MenuButton>
      </div>
    </div>
  );
};

export default Flashcard;
