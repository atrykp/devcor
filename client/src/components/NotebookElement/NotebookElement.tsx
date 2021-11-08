import { useState } from "react";
import Modal from "../Modal/Modal";
import "./NotebookElement.scss";

interface INotebookElement {
  title: string;
  id: string;
  onRemove(id: string): void;
}

const NotebookElement = ({ title, onRemove, id }: INotebookElement) => {
  return (
    <>
      <div className="notebook-element">
        <p className="notebook-element__title">{title}</p>
        <i className="fas fa-trash-alt" onClick={() => onRemove(id)}></i>
      </div>
    </>
  );
};

export default NotebookElement;
