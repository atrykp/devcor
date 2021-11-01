import { useLazyQuery, gql } from "@apollo/client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { IWordElement } from "../components/WordElement/WordElement";
import { UserCtx } from "./UserContext";

export interface ILanguageData {
  userId: string;
  dictionary: IWordElement[];
  flashcards: [];
  ignoreWords: string[];
}

const emptyLanguage: ILanguageData = {
  userId: "",
  dictionary: [],
  flashcards: [],
  ignoreWords: [],
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
        id
      }
      ignoreWords
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
        getLanguageObj: { userId, dictionary, flashcards, ignoreWords },
      } = data;
      setLanguage({ userId, dictionary, flashcards, ignoreWords });
    }
  }, [data]);

  return (
    <LanguageCtx.Provider value={language}>{children}</LanguageCtx.Provider>
  );
};

export default LanguageContext;
