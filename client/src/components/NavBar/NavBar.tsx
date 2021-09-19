import "./NavBar.scss";
import Button from "../Button/Button";

const NavBar = () => {
  return (
    <div className="navbar-wrapper">
      <h1>
        dev<span>cor</span>
      </h1>
      <Button>Join</Button>
    </div>
  );
};

export default NavBar;
