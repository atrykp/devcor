import "./TabelInfo.scss";

interface ITabelInfo {
  data: {
    [key: string]: string;
  };
}

const TabelInfo = ({ data }: ITabelInfo) => {
  const keys = Object.keys(data);

  const information = keys.map((element: any) => {
    return (
      <div className="tabel-info__row">
        <p className="tabel-info__key">{element}:</p>
        <p className="tabel-info__value">{data[element]}</p>
      </div>
    );
  });
  return (
    <>
      <div className="tabel-info">{information}</div>
    </>
  );
};

export default TabelInfo;
