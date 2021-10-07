import { useHistory } from "react-router";
import "./MenuListItem.scss";

interface MenuListItem {
  text?: string;
  path?: string;
  callback?(): void;
}

const MenuListItem = ({ text, path, callback }: MenuListItem) => {
  const history = useHistory();
  return (
    <div
      className="menu-list-item"
      onClick={() => (callback ? callback() : history.push(path!))}
    >
      <p className="menu-list-item__text">{text}</p>
    </div>
  );
};

export default MenuListItem;
