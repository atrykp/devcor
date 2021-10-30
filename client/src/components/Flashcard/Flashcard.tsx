import Button, { MenuButton } from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import "./Flashcard.scss";

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
  const { from, to, date, fromWord, toWord, iCan } = data;
  return (
    <div className="flashcard">
      <div className="flashcard__text-wrapper">
        <p className="flashcard__text-language">{from}</p>
        <div className="flashcard__translation">
          <p className="flashcard__text">{fromWord}</p>
        </div>
      </div>
      <div className="flashcard__buttons">
        <MenuButton styles="flashcard__button">ican</MenuButton>
        <IconButton styles="button--round flashcard__button-turn-over">
          <i className="fas fa-sync-alt"></i>
        </IconButton>
        <MenuButton styles="flashcard__button">icant</MenuButton>
      </div>
    </div>
  );
};

export default Flashcard;
