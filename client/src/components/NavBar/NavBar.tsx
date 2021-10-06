import { useContext } from "react";
import { useHistory } from "react-router";
import { UserCtx } from "../../context/UserContext";

import IconButton from "../IconButton/IconButton";
import arrow from "../../assets/icons/downArrow.svg";
import "./NavBar.scss";
import Button from "../Button/Button";

const NavBar = () => {
  const history = useHistory();
  const ctx = useContext(UserCtx);

  return (
    <div className="navbar">
      <h1 onClick={() => history.push("/")}>
        dev<span className="navbar__logo-color">cor</span>
      </h1>
      {ctx.id ? (
        <IconButton
          icon={arrow}
          callback={() => history.push(`/profile/${ctx.id}`)}
        >
          {ctx.name}
        </IconButton>
      ) : (
        <Button callback={() => history.push("/authorization/login")}>
          Join
        </Button>
      )}
    </div>
  );
};

export default NavBar;
