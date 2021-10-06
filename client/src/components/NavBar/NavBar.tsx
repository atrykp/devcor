import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserCtx } from "../../context/UserContext";

import IconButton from "../IconButton/IconButton";
import arrow from "../../assets/icons/downArrow.svg";
import "./NavBar.scss";
import Button from "../Button/Button";
import MenuList from "../MenuList/MenuList";

const NavBar = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const history = useHistory();
  const ctx = useContext(UserCtx);

  return (
    <div className="navbar">
      <h1 onClick={() => history.push("/")}>
        dev<span className="navbar__logo-color">cor</span>
      </h1>
      {isListOpen && <MenuList />}
      {ctx.id ? (
        <IconButton
          icon={arrow}
          callback={() => {
            setIsListOpen((prevValue) => !prevValue);
            history.push(`/profile/${ctx.id}}`);
          }}
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
