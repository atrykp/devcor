import "./IgnoreWord.scss";

interface IIgnoreWord {
  children: string;
  onRemove(word: string): void;
}

const IgnoreWord = ({ children, onRemove }: IIgnoreWord) => {
  return (
    <div className="ignore-word">
      <p>{children}</p>

      <i
        className="far fa-trash-alt ignore-word__button"
        onClick={() => onRemove(children)}
      ></i>
    </div>
  );
};

export default IgnoreWord;
