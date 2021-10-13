import React from "react";
import "./TopBar.scss";

interface ITopBar {
  children: React.ReactNode;
}

const TopBar = ({ children }: ITopBar) => {
  return <div className="top-bar">{children}</div>;
};

export default TopBar;
