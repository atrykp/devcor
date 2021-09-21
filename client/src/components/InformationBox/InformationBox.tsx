import React, { useEffect, useState } from "react";
import "./InformationBox.scss";

interface IInformationBox {
  infoData: {
    title: string;
    points: string[];
  };
}

const InformationBox = ({ infoData }: IInformationBox) => {
  const [pointsArr, setPointsArr] = useState<React.ReactNode>();
  const { title, points } = infoData || {};

  useEffect(() => {
    const pointsList = points?.map((element: string) => (
      <li className="info-box__point" key={element}>
        {element}
      </li>
    ));
    setPointsArr(pointsList);
  }, [points]);

  return (
    <div className="info-box">
      <p className="info-box__title">{title}</p>
      <ul className="info-box__points">{pointsArr}</ul>
    </div>
  );
};

export default InformationBox;
