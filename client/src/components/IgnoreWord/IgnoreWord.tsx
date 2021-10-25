import "./IgnoreWord.scss";

interface IIgnoreWord {
  children: string;
}

const IgnoreWord = ({ children }: IIgnoreWord) => {
  return (
    <div className="ignore-word">
      <p>{children}</p>

      <i className="far fa-trash-alt ignore-word__button"></i>
    </div>
  );
};

export default IgnoreWord;
