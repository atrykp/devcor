import React from "react";
import "./IconButton.scss";

interface IIconButton {
  children?: string;
  label?: string;
  icon?: string;
  callback?(): void;
  styles?: string;
}

const IconButton = ({
  children,
  label,
  icon,
  callback,
  styles,
}: IIconButton) => {
  return (
    <div className="icon-button">
      <button className={`icon-button__button ${styles ? styles : ""}`}>
        {children}
      </button>
      {label && <p>{label}</p>}
    </div>
  );
};
export default IconButton;
