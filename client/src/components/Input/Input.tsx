import "./Input.scss";

interface IInput {
  type?: string;
  styles?: string;
}

const Input = ({ type, styles }: IInput) => {
  return (
    <input type={type ? type : "text"} className={styles ? styles : "input"} />
  );
};

export default Input;
