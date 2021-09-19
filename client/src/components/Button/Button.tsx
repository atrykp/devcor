import "./Button.scss";

interface IButton {
  children?: string;
  styles?: string;
  callback?(): void;
}

const Button = ({ children, styles, callback }: IButton) => {
  return (
    <button className={styles ? styles : "button"} onClick={() => callback?.()}>
      {children}
    </button>
  );
};

export default Button;
