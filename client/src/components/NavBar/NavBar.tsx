import { useHistory } from "react-router";

import Button from "../Button/Button";
import "./NavBar.scss";

const NavBar = () => {
  const history = useHistory();
  return (
    <div className="navbar">
      <h1>
        dev<span className="navbar__logo-color">cor</span>
      </h1>
      <Button callback={() => history.push("/authorization/signup")}>
        Join
      </Button>
    </div>
  );
};

export default NavBar;
