import "./WordElement.scss";

interface IWordElement {
  fromLang: string;
  toLang: string;
  from: string;
  to: string;
  id: string;
}

const WordElement = ({ fromLang, toLang, from, to, id }: IWordElement) => {
  return (
    <div className="word-element">
      <div className="word-element__translation">
        <div className="word-element__from">
          <p className="word-element__translation-language">english</p>
          <p className="word-element__translation-word">hello</p>
        </div>
        <div className="word-element__to">
          <p className="word-element__translation-language">polish</p>
          <p className="word-element__translation-word">witaj</p>
        </div>
      </div>
      <div className="word-element__buttons">
        <i className="fas fa-edit"></i>
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
};

export default WordElement;
