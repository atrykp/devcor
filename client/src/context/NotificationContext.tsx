import React, { createContext, useEffect, useState } from "react";

interface INotificationContext {
  children: React.ReactNode;
}

interface INotification {
  visible: boolean;
  message: string;
  setNewValue(newMessage: string): void;
}

const emptyContext: INotification = {
  visible: false,
  message: "",
  setNewValue(newMessage: string) {},
};

export const NotificationCtx = createContext(emptyContext);

const NotificationContext = ({ children }: INotificationContext) => {
  const [notification, setNotification] = useState<INotification>(emptyContext);

  const showNotification = (message: string) => {
    setNotification((prevValue) => ({ ...prevValue, message, visible: true }));
  };

  const context = {
    visible: notification.visible,
    message: notification.message,
    setNewValue: showNotification,
  };

  useEffect(() => {
    if (notification.visible) {
      setTimeout(() => {
        setNotification(emptyContext);
      }, 4000);
    }
  }, [notification]);

  return (
    <NotificationCtx.Provider value={context}>
      {children}
    </NotificationCtx.Provider>
  );
};

export default NotificationContext;
