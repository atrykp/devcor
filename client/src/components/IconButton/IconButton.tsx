import React from "react";
import "./IconButton.scss";

interface IIconButton {
  children?: React.ReactNode;
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
    <div className={`icon-button ${styles || ""}`} onClick={() => callback?.()}>
      <p className={`icon-button__text`}>{children}</p>
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
