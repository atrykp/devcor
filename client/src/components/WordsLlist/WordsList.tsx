import React from "react";
import "./WordsList.scss";

interface IWordsList {
  children: React.ReactNode;
}

const WordsList = ({ children }: IWordsList) => {
  return <div className="words-list">{children}</div>;
};

export default WordsList;
