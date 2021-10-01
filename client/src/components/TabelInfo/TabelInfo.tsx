import { KeyObject } from "crypto";
import "./TabelInfo.scss";

interface ITabelInfo {
  data: {
    [key: string]: string;
  }[];
}

const TabelInfo = ({ data }: ITabelInfo) => {
  const information = data.map((element: any, index) => (
    <div>
      <p>{Object.keys(element)[index]}</p>
      <p></p>
    </div>
  ));
  return (
    <>
      <h1>Tabel Info</h1>
      <div>{information}</div>
    </>
  );
};

export default TabelInfo;
