import "./Card.scss";

interface ICard {
  children: React.ReactNode;
  styles?: string;
}

const Card = ({ children, styles }: ICard) => {
  return <div className={`card ${styles ? styles : ""}`}>{children}</div>;
};

export default Card;
