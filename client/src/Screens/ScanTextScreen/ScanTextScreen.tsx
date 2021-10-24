import { toInteger } from "lodash";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import "./ScanTextScreen.scss";

const IGNORE_LIST = "ignoreList";
const WORDS_LIST = "wordsList";

const ScanTextScreen = () => {
  const [isError, setIsError] = useState(false);
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
    console.log(formValues);
  };

  return (
    <div className="scan-text-screen">
      <p className="scan-text-screen__title">Scan text</p>
      <div className="scan-text-screen__top-bar">
        <Button styles="button--secondary scan-text-screen__button-ignore">
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
    </div>
  );
};

export default ScanTextScreen;
