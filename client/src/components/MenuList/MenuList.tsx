import MenuListItem from "../MenuListItem/MenuListItem";
import "./MenuList.scss";

const MenuList = () => {
  return (
    <div className="menu-list__wrapper">
      <ul className="menu-list__list">
        <MenuListItem />
        <MenuListItem />
        <MenuListItem />
        <MenuListItem />
      </ul>
    </div>
  );
};

export default MenuList;
