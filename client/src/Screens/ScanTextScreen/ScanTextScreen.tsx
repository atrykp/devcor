import { toInteger } from "lodash";
import { useRef, useState } from "react";
import Button from "../../components/Button/Button";
import "./ScanTextScreen.scss";

const ScanTextScreen = () => {
  const [rangeValue, setRangeValue] = useState(3);
  const rangeRef = useRef<HTMLInputElement>(null!);
  return (
    <div className="scan-text-screen">
      <p className="scan-text-screen__title">Scan text</p>
      <div className="scan-text-screen__top-bar">
        <Button styles="button--secondary scan-text-screen__button-ignore">
          Show ignore list
        </Button>
      </div>
      <textarea className="scan-text-screen__text-area"></textarea>

      <div className="scan-text-screen__check-boxes">
        <label htmlFor="ignoreList">
          <input type="checkbox" name="ignore my words" id="ignoreList" />
          Ignore words from my ignore list
        </label>

        <label htmlFor="wordsList">
          <input type="checkbox" name="ignore my words" id="wordsList" />
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

      <Button styles="scan-text-screen__scan-btn">Scan</Button>
    </div>
  );
};

export default ScanTextScreen;
