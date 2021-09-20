import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./DefaultLayout.scss";

interface IDefaultLayout {
  children: React.ReactChild;
}

const DefaultLayout = ({ children }: IDefaultLayout) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="app-wrapper">
      <NavBar />
      {children}
      <footer className="main-footer">
        <p>{!data ? "Loading..." : data}</p>
      </footer>
    </div>
  );
};

export default DefaultLayout;
