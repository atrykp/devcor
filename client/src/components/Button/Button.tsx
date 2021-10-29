import { useHistory } from "react-router";
import "./Button.scss";

interface IButton {
  children?: string;
  styles?: string;
  callback?(): void;
  type?: string;
}

const Button = ({ children, styles, callback }: IButton) => {
  return (
    <button
      className={`button ${styles ? styles : ""}`}
      onClick={() => callback?.()}
    >
      {children}
    </button>
  );
};

export const MenuButton = ({ children, ...props }: IButton) => {
  return (
    <Button styles={"button--menu-list"} {...props}>
      {children}
    </Button>
  );
};
export const BackButton = ({ children, ...props }: IButton) => {
  const history = useHistory();
  return (
    <i
      className="fas fa-angle-left button--back"
      onClick={() => history.goBack()}
    ></i>
  );
};

export default Button;
