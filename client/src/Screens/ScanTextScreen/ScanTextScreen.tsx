import { useMutation, gql } from "@apollo/client";
import { toInteger } from "lodash";
import { useContext, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import IgnoreWord from "../../components/IgnoreWord/IgnoreWord";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import { LanguageCtx } from "../../context/LanguageContext";
import { useAuth } from "../../hooks/useAuth";
import "./ScanTextScreen.scss";

const IGNORE_LIST = "ignoreList";
const WORDS_LIST = "wordsList";

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

const ScanTextScreen = () => {
  useAuth("protect");
  const langCtx = useContext(LanguageCtx);
  const addIgnoreRef = useRef<HTMLInputElement>(null!);
  const [isError, setIsError] = useState(false);
  const [isIgnoreList, setIsIgnoreList] = useState(false);
  const [rangeValue, setRangeValue] = useState(3);
  const [checkBoxesValues, setCheckBoxesValues] = useState({
    ignoreList: false,
    wordsList: false,
  });
  const [addIgnoreWord] = useMutation(ADD_IGNORE_WORD, {
    refetchQueries: ["GetLanguageObj"],
  });
  const [removeIgnoreWord] = useMutation(REMOVE_IGNORE_WORD, {
    refetchQueries: ["GetLanguageObj"],
  });
  const rangeRef = useRef<HTMLInputElement>(null!);
  const textAreaRef = useRef<HTMLTextAreaElement>(null!);
  const setCheckboxValue = (key: "ignoreList" | "wordsList") => {
    setCheckBoxesValues((prevValue) => ({
      ...prevValue,
      [key]: !prevValue[key],
    }));
  };

  const onSubmit = () => {
    if (!textAreaRef.current.value) return setIsError(true);
    if (isError) setIsError(false);
    const formValues = {
      ...checkBoxesValues,
      range: rangeValue,
      text: textAreaRef.current.value,
    };
    console.log(formValues);
  };
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
    <div className="scan-text-screen">
      <p className="scan-text-screen__title">Scan text</p>
      <div className="scan-text-screen__top-bar">
        <Button
          styles="button--secondary scan-text-screen__button-ignore"
          callback={() => setIsIgnoreList(true)}
        >
          Show ignore list
        </Button>
      </div>
      <textarea
        className="scan-text-screen__text-area"
        ref={textAreaRef}
      ></textarea>
      {isError && <p className="scan-text-screen__error">text is require</p>}

      <div className="scan-text-screen__check-boxes">
        <label htmlFor="ignoreList">
          <input
            type="checkbox"
            name="ignore my words"
            id="ignoreList"
            onChange={() => setCheckboxValue(IGNORE_LIST)}
          />
          Ignore words from my ignore list
        </label>

        <label htmlFor="wordsList">
          <input
            type="checkbox"
            name="ignore my words"
            id="wordsList"
            onChange={() => setCheckboxValue(WORDS_LIST)}
          />
          Ignore words from my list
        </label>
      </div>
      <div className="scan-text-screen__slider-input">
        <input
          type="range"
          min="0"
          max="20"
          defaultValue={rangeValue}
          onChange={() => setRangeValue(toInteger(rangeRef.current.value))}
          ref={rangeRef}
        />
        <p>min. word length: {rangeValue}</p>
      </div>

      <Button styles="scan-text-screen__scan-btn" callback={() => onSubmit()}>
        Scan
      </Button>
      {isIgnoreList && (
        <Modal title="ignore list">
          {langCtx.ignoreWords.map((element: string) => (
            <IgnoreWord key={element} onRemove={onRemoveIgnoreWord}>
              {element}
            </IgnoreWord>
          ))}
          <div className="scan-text-screen__add-ignore">
            <Input styles="scan-text-screen__add-input" ref={addIgnoreRef} />
            <i className="fas fa-plus-square" onClick={onSaveIgnoreWord}></i>
          </div>

          <Button
            styles="button--secondary"
            callback={() => setIsIgnoreList(false)}
          >
            close
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default ScanTextScreen;
