import InformationBox from "../../components/InformationBox/InformationBox";
import informationData from "../../assets/data/information.json";

import "./StartPage.scss";

const StartPage = () => {
  return (
    <div className="start-page">
      <div className="start-page__header-wrapper">
        <p className="start-page__header-text">
          Perfect place for developers who want improve skills all the time!
        </p>
        <div className="start-page__header-img"></div>
      </div>
      <div className="start-page__quote-wrapper">
        <p className="start-page__quote-text">
          Become addicted to constant and never-ending self-improvement.
        </p>
        <p className="start-page__quote-author"> - Anthony J. D’Angelo</p>
      </div>
      <div className="start-page__information">
        <p className="start-page__information-header">Functions</p>
        <InformationBox infoData={informationData.informationBox.first} />
        <InformationBox infoData={informationData.informationBox.second} />
        <InformationBox infoData={informationData.informationBox.third} />
      </div>
    </div>
  );
};

export default StartPage;
