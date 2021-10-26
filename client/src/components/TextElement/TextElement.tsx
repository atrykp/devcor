import "./TextElement.scss";

interface ITextElement {
  children: string;
  onRemove(word: string): void;
}

const TextElement = ({ children, onRemove }: ITextElement) => {
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

export default TextElement;
