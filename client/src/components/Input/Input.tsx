import "./Input.scss";

interface IInput {
  type?: string;
  styles?: string;
  placeholder?: string;
  register?: any;
  name?: string;
}

const Input = ({ type, styles, register, name, ...props }: IInput) => {
  return <input className={`input ${styles ? styles : ""}`} {...props} />;
};

export default Input;
