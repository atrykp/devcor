import { useState } from "react";
import Modal from "../Modal/Modal";
import "./NotebookElement.scss";

interface INotebookElement {
  title: string;
  id: string;
}

const NotebookElement = ({ title }: INotebookElement) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      {isVisible && (
        <Modal
          title="are you sure"
          confirmTxt="yes"
          cancelTxt="no"
          confirmCallback={() => console.log("remove")}
          cancelCallback={() => setIsVisible(false)}
        />
      )}
      <div className="notebook-element">
        <p className="notebook-element__title">{title}</p>
        <i className="fas fa-trash-alt" onClick={() => setIsVisible(true)}></i>
      </div>
    </>
  );
};

export default NotebookElement;
