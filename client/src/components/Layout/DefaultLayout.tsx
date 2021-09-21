import { useEffect, useState } from "react";
import Input from "../Input/Input";
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
    <div className="layout">
      <NavBar />
      {children}
      <footer className="layout__footer">
        <p>{!data ? "Loading..." : data}</p>
        <Input />
      </footer>
    </div>
  );
};

export default DefaultLayout;