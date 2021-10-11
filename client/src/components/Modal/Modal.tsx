import ReactDOM from "react-dom";
import { useEffect } from "react";
import Button from "../Button/Button";
import "./Modal.scss";

interface IModal {
  children: React.ReactNode;
  title?: string;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
  confirmTxt?: string;
  cancelTxt?: string;
}

const portal = document.getElementById("modal-portal");

const Modal = ({
  title,
  children,
  confirmCallback,
  cancelCallback,
  confirmTxt,
  cancelTxt,
}: IModal) => {
  const node = document.createElement("div");

  useEffect(() => {
    portal?.appendChild(node);
    return () => {
      portal?.removeChild(node);
    };
  }, []);
  return ReactDOM.createPortal(
    <div className="modal">
      <p className="modal__header">{title}</p>
      {children}
      <div className="modal__buttons">
        {confirmCallback ||
          (confirmTxt && (
            <Button callback={confirmCallback}>{confirmTxt}</Button>
          ))}
        {cancelCallback ||
          (cancelTxt && <Button callback={cancelCallback}>{cancelTxt}</Button>)}
      </div>
    </div>,
    node
  );
};

export default Modal;
