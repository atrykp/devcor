import "./CardTitle.scss";

interface ICardTitle {
  children: React.ReactNode;
  title?: string;
}

const CardTitle = ({ title, children }: ICardTitle) => {
  return (
    <div className="card-title">
      <p className="card-title__header">{title}</p>
      {children}
    </div>
  );
};

export default CardTitle;
