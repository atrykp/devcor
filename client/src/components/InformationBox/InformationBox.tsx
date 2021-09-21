import "./InformationBox.scss";

interface IInformationBox {
  infoData: {
    title: string;
    points: string[];
  };
}

const InformationBox = ({ infoData }: IInformationBox) => {
  return <div className="info-box"></div>;
};

export default InformationBox;
