import { useContext } from "react";
import { NotificationCtx } from "../../context/NotificationContext";
import "./NotificationBar.scss";

const NotificationBar = () => {
  const ctx = useContext(NotificationCtx);
  return (
    <div className={`notification-bar notification-bar--${ctx.status}`}>
      <p>{ctx.message}</p>
    </div>
  );
};

export default NotificationBar;
