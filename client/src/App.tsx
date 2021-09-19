import React, { useEffect, useState } from "react";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  return (
    <div className="app-wrapper">
      <NavBar />
      <div className="header-wrapper">
        <div className="header-content">
          <p className="header-content-text">
            Perfect place for developers who want improve skills all the time!
          </p>
          <div className="header-content-img"></div>
        </div>
      </div>
      <div className="main-quote">
        <p className="main-quote-text">
          Become addicted to constant and never-ending self-improvement.
        </p>
        <p className="main-quote-author"> - Anthony J. D’Angelo</p>
      </div>
      <div className="main-information">
        <p className="main-information-header">Functions</p>
      </div>
      <footer className="main-footer">
        <p>{!data ? "Loading..." : data}</p>
      </footer>
    </div>
  );
}

export default App;
