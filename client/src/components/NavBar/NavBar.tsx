import "./NavBar.scss";
import Button from "../Button/Button";

const NavBar = () => {
  return (
    <div className="navbar">
      <h1>
        dev<span className="navbar__logo-color">cor</span>
      </h1>
      <Button>Join</Button>
    </div>
  );
};

export default NavBar;
