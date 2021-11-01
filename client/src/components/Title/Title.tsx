import { BackButton } from "../Button/Button";
import "./Title.scss";

interface ITitle {
  text: string;
  isBackButton?: boolean;
}

const Title = ({ text, isBackButton }: ITitle) => {
  return (
    <div className="title">
      {isBackButton && (
        <div className="title__back-button">
          <BackButton />
        </div>
      )}
      <p className="title__text">{text}</p>
    </div>
  );
};

export default Title;
