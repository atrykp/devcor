import { useMutation, gql } from "@apollo/client";
import { useContext, useRef } from "react";
import { LanguageCtx } from "../../context/LanguageContext";
import Button from "../Button/Button";
import TextElement from "../TextElement/TextElement";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import "./IgnoreWordModal.scss";

interface IIgnoreModal {
  closeModal(): void;
}

const ADD_IGNORE_WORD = gql`
  mutation AddIgnoreWord($word: String) {
    addIgnoreWord(word: $word) {
      status
      message
    }
  }
`;
const REMOVE_IGNORE_WORD = gql`
  mutation RemoveIgnoreWord($word: String) {
    removeIgnoreWord(word: $word) {
      status
      message
    }
  }
`;

const IgnoreWordModal = ({ closeModal }: IIgnoreModal) => {
  const addIgnoreRef = useRef<HTMLInputElement>(null!);
  const [addIgnoreWord] = useMutation(ADD_IGNORE_WORD, {
    refetchQueries: ["GetLanguageObj"],
  });
  const [removeIgnoreWord] = useMutation(REMOVE_IGNORE_WORD, {
    refetchQueries: ["GetLanguageObj"],
  });
  const langCtx = useContext(LanguageCtx);
  const onSaveIgnoreWord = async () => {
    const newWord = addIgnoreRef.current.value;
    if (!newWord) return;
    const { data } = await addIgnoreWord({
      variables: {
        word: newWord,
      },
    });
  };
  const onRemoveIgnoreWord = async (word: string) => {
    if (!word) return;
    const { data } = await removeIgnoreWord({
      variables: {
        word,
      },
    });
  };

  return (
    <Modal title="ignore list">
      <div className="ignore-word-modal__list">
        {langCtx.ignoreWords.map((element: string) => (
          <TextElement key={element} onRemove={onRemoveIgnoreWord}>
            {element}
          </TextElement>
        ))}
      </div>

      <div className="ignore-word-modal__add-ignore">
        <Input styles="ignore-word-modal__add-input" ref={addIgnoreRef} />
        <i className="fas fa-plus-square" onClick={onSaveIgnoreWord}></i>
      </div>

      <Button styles="button--secondary" callback={closeModal}>
        close
      </Button>
    </Modal>
  );
};

export default IgnoreWordModal;
