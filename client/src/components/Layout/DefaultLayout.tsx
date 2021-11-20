import NavBar from "../NavBar/NavBar";
import "./DefaultLayout.scss";

interface IDefaultLayout {
  children: React.ReactChild;
}

const DefaultLayout = ({ children }: IDefaultLayout) => {
  // const [data, setData] = useState<any>(null);
  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div className="layout">
      <NavBar />
      <div className="layout__body">{children}</div>
      <footer className="layout__footer">
        {/* <p>{!data ? "Loading..." : data}</p> */}
        <p className="layout__footer--text">&copy; by Patryk Plaza atrykp </p>
      </footer>
    </div>
  );
};

export default DefaultLayout;
