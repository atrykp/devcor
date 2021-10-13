import React from "react";
import "./LanguageContainer.scss";

interface ILanguageContainer {
  children: React.ReactNode;
}

const LanguageContainer = ({ children }: ILanguageContainer) => {
  return <div className="language-container">{children}</div>;
};

export default LanguageContainer;
