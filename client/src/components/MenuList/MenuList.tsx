import { useContext } from "react";
import { useHistory } from "react-router";
import { useMutation, gql } from "@apollo/client";

import { UserCtx } from "../../context/UserContext";
import { useNotificationBar } from "../../hooks/useNotificationBar";

import MenuListItem from "../MenuListItem/MenuListItem";
import "./MenuList.scss";

interface IMenuList {
  closeMenu(): void;
}

export const LOG_OUT = gql`
  mutation LogOutUser($id: ID!) {
    logoutUser(id: $id) {
      message
      status
    }
  }
`;

const MenuList = ({ closeMenu }: IMenuList) => {
  const [logout, { client }] = useMutation(LOG_OUT);
  const history = useHistory();
  const { showNotification } = useNotificationBar();
  const ctx = useContext(UserCtx);

  const logoutUser = async () => {
    try {
      showNotification("Logging out...", "pending");
      const { data } = await logout({
        variables: {
          id: ctx.id,
        },
      });
      client.clearStore();
      if (data.logoutUser.status) {
        showNotification(data.logoutUser.message, "done");
        history.push("/authorization/login");
        ctx.setUserData();
      }
    } catch (error) {
      showNotification("something went wrong", "error");
      history.push("/authorization/login");
    }
  };
  return (
    <div className="menu-list__wrapper" onClick={closeMenu}>
      <ul className="menu-list__list">
        <MenuListItem text={"profile"} path={`/profile/${ctx.id}`} />
        <MenuListItem text={"language"} path={`/language`} />
        <MenuListItem text={"notebooks"} path={`/notebooks`} />
        <MenuListItem text={"timer"} path={`/timer`} />
        <MenuListItem text={"logout"} callback={logoutUser} />
      </ul>
    </div>
  );
};

export default MenuList;
