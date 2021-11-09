import { useLazyQuery, gql } from "@apollo/client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { UserCtx } from "./UserContext";

export interface INotebookData {
  userId: string;
  notebooks: any[];
}

const emptyNotebook: INotebookData = {
  userId: "",
  notebooks: [],
};

const GET_NOTEBOOK_OBJ = gql`
  query GetNotebookObj($userId: ID!) {
    getNotebookObj(userId: $userId) {
      userId
      notebooks {
        name
        id
        notes {
          title
          text
          date
        }
      }
    }
  }
`;

export const NotebookCtx = createContext(emptyNotebook);

const NotebookContext = ({ children }: { children: React.ReactNode }) => {
  const [notebook, setNotebook] = useState<INotebookData>(emptyNotebook);
  const userContext = useContext(UserCtx);
  const [getNotebookObj, { data }] = useLazyQuery(GET_NOTEBOOK_OBJ, {
    variables: { userId: userContext.id },
  });

  useEffect(() => {
    if (userContext.id) getNotebookObj();
  }, [userContext.id, getNotebookObj]);

  useEffect(() => {
    if (data) {
      const {
        getNotebookObj: { userId, notebooks },
      } = data;
      setNotebook({ userId, notebooks });
    }
  }, [data]);

  return (
    <NotebookCtx.Provider value={notebook}>{children}</NotebookCtx.Provider>
  );
};

export default NotebookContext;
