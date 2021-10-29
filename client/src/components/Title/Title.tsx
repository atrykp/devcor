import "./Title.scss";

interface ITitle {
  children: string;
}

const Title = ({ children }: ITitle) => {
  return <p className="title">{children}</p>;
};

export default Title;
