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

const Modal = ({
  title,
  children,
  confirmCallback,
  cancelCallback,
  confirmTxt,
  cancelTxt,
}: IModal) => {
  return (
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
    </div>
  );
};

export default Modal;
