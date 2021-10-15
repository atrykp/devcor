import React from "react";
import "./TopBar.scss";

interface ITopBar {
  children?: React.ReactNode;
  title?: string;
  moreIcon?: boolean;
  moreText?: boolean;
  onMore?(): void;
}

const TopBar = ({ children, title, moreIcon, onMore, moreText }: ITopBar) => {
  return (
    <div className="top-bar">
      {title && <p className="top-bar__header">{title}</p>}
      {moreIcon && (
        <i
          className="fas fa-ellipsis-v top-bar__menu-icon"
          onClick={onMore}
        ></i>
      )}
      {moreText && (
        <p className="top-bar__more-txt" onClick={onMore}>
          more...
        </p>
      )}
      {children}
    </div>
  );
};

export default TopBar;
