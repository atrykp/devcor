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
    <div className="icon-button" onClick={() => callback?.()}>
      <p className={`icon-button__text ${styles || ""}`}>{children}</p>
      {icon && (
        <div
          style={{ backgroundImage: `url(${icon || ""})` }}
          className="icon-button__img"
        ></div>
      )}
      {label && <p>{label}</p>}
    </div>
  );
};
export default IconButton;
