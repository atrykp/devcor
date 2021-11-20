import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserCtx } from "../../context/UserContext";

import IconButton from "../IconButton/IconButton";
import arrow from "../../assets/icons/downArrow.svg";
import Button from "../Button/Button";
import MenuList from "../MenuList/MenuList";

import "./NavBar.scss";

const NavBar = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const history = useHistory();
  const ctx = useContext(UserCtx);

  const closeMenu = () => {
    setIsListOpen(false);
  };

  return (
    <div className="navbar">
      <h1 onClick={() => history.push("/")} className="navbar__logo">
        dev<span className="navbar__logo-color">cor</span>
      </h1>
      {isListOpen && <MenuList closeMenu={closeMenu} />}
      {ctx.id ? (
        <IconButton
          icon={arrow}
          callback={() => {
            setIsListOpen((prevValue) => !prevValue);
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
