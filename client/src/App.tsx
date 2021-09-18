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
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default App;
