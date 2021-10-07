import { useContext } from "react";
import { UserCtx } from "../../context/UserContext";
import MenuListItem from "../MenuListItem/MenuListItem";
import "./MenuList.scss";

interface IMenuList {
  closeMenu(): void;
}

const MenuList = ({ closeMenu }: IMenuList) => {
  const ctx = useContext(UserCtx);
  const logoutUser = () => {
    console.log("logout user");
  };
  return (
    <div className="menu-list__wrapper" onClick={closeMenu}>
      <ul className="menu-list__list">
        <MenuListItem text={"profile"} path={`/profile/${ctx.id}`} />
        <MenuListItem text={"language"} path={`/language`} />
        <MenuListItem text={"note"} path={`/note`} />
        <MenuListItem text={"timer"} path={`/timer`} />
        <MenuListItem text={"logout"} callback={logoutUser} />
      </ul>
    </div>
  );
};

export default MenuList;
