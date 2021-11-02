import { useRef } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./EditWordElement.scss";

interface IEditWordElement {
  from: string;
  to: string;
  closeEdit(): void;
  onEditWord(fromVal: string, toVal: string): void;
}

const EditWordElement = ({
  from,
  to,
  closeEdit,
  onEditWord,
}: IEditWordElement) => {
  const fromRef = useRef<HTMLInputElement>(null!);
  const toRef = useRef<HTMLInputElement>(null!);

  return (
    <div className="edit-word-element">
      <h1>edit mode</h1>
      <Input defaultValue={from} ref={fromRef} />
      <Input defaultValue={to} ref={toRef} />
      <div className="edit-word-element__buttons">
        <Button
          callback={() =>
            onEditWord(fromRef.current.value!, toRef.current.value)
          }
        >
          edit
        </Button>
        <Button callback={closeEdit} styles="button--secondary">
          cancel
        </Button>
      </div>
    </div>
  );
};

export default EditWordElement;
