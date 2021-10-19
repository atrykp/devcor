import { useLazyQuery, gql } from "@apollo/client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { IWordElement } from "../components/WordElement/WordElement";
import { UserCtx } from "./UserContext";

export interface ILanguageData {
  userId: string;
  dictionary: IWordElement[];
  flashcards: [];
}

const emptyLanguage: ILanguageData = {
  userId: "",
  dictionary: [],
  flashcards: [],
};

const GET_LANGUAGE_OBJ = gql`
  query GetLanguageObj($userId: ID!) {
    getLanguageObj(userId: $userId) {
      userId
      dictionary {
        fromLang
        toLang
        from
        to
        id
      }
      flashcards {
        from
        fromLang
        to
        toLang
        iCan
      }
    }
  }
`;

export const LanguageCtx = createContext(emptyLanguage);

const LanguageContext = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<ILanguageData>(emptyLanguage);

  const userContext = useContext(UserCtx);
  const [getLanguageObj, { data }] = useLazyQuery(GET_LANGUAGE_OBJ, {
    variables: { userId: userContext.id },
  });

  useEffect(() => {
    if (userContext.id) getLanguageObj();
  }, [userContext.id, getLanguageObj]);
  useEffect(() => {
    if (data) {
      const {
        getLanguageObj: { userId, dictionary, flashcards },
      } = data;
      setLanguage({ userId, dictionary, flashcards });
    }
  }, [data]);

  return (
    <LanguageCtx.Provider value={language}>{children}</LanguageCtx.Provider>
  );
};

export default LanguageContext;
