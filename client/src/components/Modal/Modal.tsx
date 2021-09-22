import Button from "../Button/Button";
import "./Modal.scss";

interface IModal {
  children: React.ReactNode;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
  confirmTxt?: string;
  cancelTxt?: string;
}

const Modal = ({
  children,
  confirmCallback,
  cancelCallback,
  confirmTxt,
  cancelTxt,
}: IModal) => {
  return (
    <div className="modal">
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
