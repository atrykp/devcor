import Button from "../../components/Button/Button";
import "./ScanTextScreen.scss";

const ScanTextScreen = () => {
  return (
    <div className="scan-text-screen">
      <p className="scan-text-screen__title">Scan text screen</p>
      <div className="scan-text-screen__top-bar">
        <Button styles="button--secondary">Show ignore list</Button>
      </div>
      <textarea className="scan-text-screen__text-area"></textarea>
      <input type="checkbox" name="ignore my words" id="ignoreList" />
      <label htmlFor="ignoreList">Ignore words from my ignore list</label>
      <input type="checkbox" name="ignore my words" id="wordsList" />
      <label htmlFor="wordsList">Ignore words from my list</label>
      <button>set min length</button>

      <Button>Scan</Button>
    </div>
  );
};

export default ScanTextScreen;
