import { useContext } from "react";
import { useHistory } from "react-router";
import { UserCtx } from "../../context/UserContext";

import Button from "../Button/Button";
import "./NavBar.scss";

const NavBar = () => {
  const history = useHistory();
  const ctx = useContext(UserCtx);

  return (
    <div className="navbar">
      <h1 onClick={() => history.push("/")}>
        dev<span className="navbar__logo-color">cor</span>
      </h1>
      <Button
        callback={() =>
          history.push(
            `${ctx.id ? `/profile/${ctx.id}` : "/authorization/login"}`
          )
        }
      >
        {ctx.id ? ctx.name : "Join"}
      </Button>
    </div>
  );
};

export default NavBar;
