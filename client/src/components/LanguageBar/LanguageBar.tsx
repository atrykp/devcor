import { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import SelectLanguage from "../SelectLanguage/SelectLanguage";

import "./LanguageBar.scss";
import UserContext, { UserCtx } from "../../context/UserContext";

const options = [
  { value: "english", label: "English" },
  { value: "polish", label: "Polish" },
  { value: "german", label: "German" },
];

const UPDATE_USER_LANGUAGE = gql`
  mutation UpdateUserLanguage($id: ID!, $native: String, $learn: String) {
    updateUserLanguage(id: $id, native: $native, learn: $learn) {
      status
      message
    }
  }
`;

const LanguageBar = () => {
  const ctx = useContext(UserCtx);
  const [nativLang, setNativLang] = useState("");
  const [learnLang, setLearnLang] = useState("");

  const {
    id,
    language: { learn, native },
  } = ctx;

  const [updateUserLanguage, { loading, error, data }] =
    useMutation(UPDATE_USER_LANGUAGE);

  const handleNativChange = async (selected: any, elemId: any) => {
    setNativLang(selected);
    const resposeData = await updateUserLanguage({
      variables: { id, native: selected.value, learn },
    });
  };
  const handleLearnChange = async (selected: any) => {
    setLearnLang(selected);
    updateUserLanguage({
      variables: { id, learn: selected.value, native },
    });
  };

  return (
    <>
      <div className="language-bar">
        <SelectLanguage
          label="native"
          options={options}
          handleChange={handleNativChange}
          defaultValue={ctx.language.native}
          elemId={"native"}
        />
        <SelectLanguage
          label="learn"
          options={options}
          handleChange={handleLearnChange}
          defaultValue={ctx.language.learn}
          elemId={"learn"}
        />
      </div>
    </>
  );
};

export default LanguageBar;
