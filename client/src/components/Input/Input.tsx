import "./Input.scss";

interface IInput {
  type?: string;
  styles?: string;
  placeholderTxt?: string;
}

const Input = ({ type, styles, placeholderTxt }: IInput) => {
  return (
    <input
      type={type ? type : "text"}
      className={`input ${styles ? styles : ""}`}
      placeholder={placeholderTxt}
    />
  );
};

export default Input;
