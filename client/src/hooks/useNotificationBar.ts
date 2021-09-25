import { useContext, useRef } from "react";
import {
  NotificationCtx,
  NotificationStatus,
} from "../context/NotificationContext";

export const useNotificationBar = () => {
  const ctx = useContext(NotificationCtx);
  const functionRef = useRef((message: string, status: NotificationStatus) => {
    ctx.setNewValue(message, status);
  });

  return { showNotification: functionRef.current };
};
