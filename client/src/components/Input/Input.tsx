import "./Input.scss";

interface IInput {
  type?: string;
  styles?: string;
  placeholderTxt?: string;
  register?: any;
  name?: string;
}

const Input = ({ type, styles, placeholderTxt, register, name }: IInput) => {
  return (
    <input
      type={type ? type : "text"}
      className={`input ${styles ? styles : ""}`}
      placeholder={placeholderTxt}
      {...register(name)}
    />
  );
};

export default Input;
