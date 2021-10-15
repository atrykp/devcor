import React from "react";
import "./Input.scss";

interface IInput {
  styles?: string;
  placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInput>(
  ({ styles, ...props }, ref) => {
    return (
      <input className={`input ${styles ? styles : ""}`} {...props} ref={ref} />
    );
  }
);

export default Input;
