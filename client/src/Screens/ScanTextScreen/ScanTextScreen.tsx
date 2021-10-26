import { useRef, useState } from "react";
import _, { toInteger } from "lodash";

import Button from "../../components/Button/Button";
import IgnoreWordModal from "../../components/IgnoreWordModal/IgnoreWordModal";

import { useAuth } from "../../hooks/useAuth";

import "./ScanTextScreen.scss";
import Modal from "../../components/Modal/Modal";
import TextElement from "../../components/TextElement/TextElement";

const IGNORE_LIST = "ignoreList";
const WORDS_LIST = "wordsList";

const ScanTextScreen = () => {
  useAuth("protect");
  const [isScanned, setIsScanned] = useState(false);
  const [scannedList, setScannedList] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [isIgnoreList, setIsIgnoreList] = useState(false);
  const [rangeValue, setRangeValue] = useState(3);
  const [checkBoxesValues, setCheckBoxesValues] = useState({
    ignoreList: false,
    wordsList: false,
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
    setIsScanned(true);
    let wordsFromTxt = formValues.text.replace(/[^a-zA-Z ]/g, "").split(" ");

    wordsFromTxt = _.uniq(wordsFromTxt)
      .map((element) => element.toLowerCase())
      .sort();
    setScannedList(wordsFromTxt);
  };

  const closeModal = () => setIsIgnoreList(false);
  const closeScanned = () => setIsScanned(false);

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
      {isIgnoreList && <IgnoreWordModal closeModal={closeModal} />}
      {isScanned && (
        <Modal
          title="scanning text"
          cancelCallback={closeScanned}
          cancelTxt="close"
        >
          <div className="scan-text-screen__words-list">
            {scannedList.map((element: string) => (
              <TextElement key={element} onRemove={() => console.log(element)}>
                {element}
              </TextElement>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ScanTextScreen;
