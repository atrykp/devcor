import "./Button.scss";

interface IButton {
  children?: string;
  styles?: string;
  callback?(): void;
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

export default Button;
