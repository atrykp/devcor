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
        <p className="flashcard__text">{fromWord}</p>
      </div>
      <div className="flashcard__text-buttons">
        <button>ican</button>
        <button>turn</button>
        <button>icant</button>
      </div>
    </div>
  );
};

export default Flashcard;
