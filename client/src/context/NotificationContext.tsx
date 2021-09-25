import React, { createContext, useEffect, useState } from "react";

interface INotificationContext {
  children: React.ReactNode;
}

type NotificationStatus = "pending" | "done" | "error";

interface INotification {
  status: NotificationStatus;
  message: string;
  setNewValue(newMessage: string, status: NotificationStatus): void;
}

const emptyContext: INotification = {
  status: "pending",
  message: "",
  setNewValue() {},
};

export const NotificationCtx = createContext(emptyContext);

const NotificationContext = ({ children }: INotificationContext) => {
  const [notification, setNotification] = useState<INotification>(emptyContext);

  const showNotification = (message: string, status: NotificationStatus) => {
    setNotification((prevValue) => ({ ...prevValue, message, status }));
  };

  const context = {
    status: notification.status,
    message: notification.message,
    setNewValue: showNotification,
  };

  useEffect(() => {
    let timerId = setTimeout(() => {
      setNotification(emptyContext);
    }, 4000);
    return () => {
      clearTimeout(timerId);
    };
  }, [notification]);

  return (
    <NotificationCtx.Provider value={context}>
      {children}
    </NotificationCtx.Provider>
  );
};

export default NotificationContext;
