import "./WordElement.scss";

const WordElement = () => {
  return (
    <div className="word-element">
      <div className="word-element__translation">
        <div className="word-element__from">
          <p>english</p>
          <p>hello</p>
        </div>
        <div className="word-element__to">
          <p>polish</p>
          <p>witaj</p>
        </div>
      </div>
      <div className="word-element__buttons">
        <button>edit</button>
        <button>remove</button>
      </div>
    </div>
  );
};

export default WordElement;
