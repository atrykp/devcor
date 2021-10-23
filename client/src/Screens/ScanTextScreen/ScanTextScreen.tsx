import Button from "../../components/Button/Button";
import "./ScanTextScreen.scss";

const ScanTextScreen = () => {
  return (
    <div className="scan-text-screen">
      <p className="scan-text-screen__title">Scan text</p>
      <div className="scan-text-screen__top-bar">
        <Button styles="button--secondary scan-text-screen__button-ignore">
          Show ignore list
        </Button>
      </div>
      <textarea className="scan-text-screen__text-area"></textarea>

      <label htmlFor="ignoreList">
        <input type="checkbox" name="ignore my words" id="ignoreList" />
        Ignore words from my ignore list
      </label>

      <label htmlFor="wordsList">
        <input type="checkbox" name="ignore my words" id="wordsList" />
        Ignore words from my list
      </label>
      <button>set min length</button>

      <Button styles="scan-text-screen__scan-btn">Scan</Button>
    </div>
  );
};

export default ScanTextScreen;
