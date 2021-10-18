import "./WordElement.scss";

interface IWordElement {
  fromLang: string;
  toLang: string;
  from: string;
  to: string;
  id: string;
}

const WordElement = ({ fromLang, toLang, from, to, id }: IWordElement) => {
  const editWord = (id: string) => {};
  const removeWord = (id: string) => {};
  return (
    <div className="word-element">
      <div className="word-element__translation">
        <div className="word-element__from">
          <p className="word-element__translation-language">{fromLang}</p>
          <p
            className={`word-element__translation-word ${
              from.length > 7 && from.length <= 13
                ? "word-element__translation-word--small"
                : ""
            } ${
              from.length > 13 ? "word-element__translation-word--xsmall" : ""
            }`}
          >
            {from}
          </p>
        </div>
        <div className="word-element__to">
          <p className="word-element__translation-language">{toLang}</p>
          <p
            className={`word-element__translation-word ${
              from.length > 7 && from.length <= 13
                ? "word-element__translation-word--small"
                : ""
            } ${
              from.length > 13 ? "word-element__translation-word--xsmall" : ""
            }`}
          >
            {to}
          </p>
        </div>
      </div>
      <div className="word-element__buttons">
        <i className="fas fa-edit" onClick={() => editWord(id)}></i>
        <i className="fas fa-trash-alt" onClick={() => removeWord(id)}></i>
      </div>
    </div>
  );
};

export default WordElement;
