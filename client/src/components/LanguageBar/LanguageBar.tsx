import { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import SelectLanguage from "../SelectLanguage/SelectLanguage";

import "./LanguageBar.scss";
import { UserCtx } from "../../context/UserContext";

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
const NATIVE = "native";

const LanguageBar = () => {
  const ctx = useContext(UserCtx);

  const {
    id,
    language: { learn, native },
  } = ctx;

  const [updateUserLanguage, { loading, error, data }] = useMutation(
    UPDATE_USER_LANGUAGE,
    {
      refetchQueries: ["IsUserAuth"],
    }
  );

  useEffect(() => {
    if (data?.updateUserLanguage?.status) {
      console.log(data.updateUserLanguage.message);
    }
  }, [data]);

  const handleSelecet = async (selected: any, elemId: string) => {
    let response: any;
    if (elemId === NATIVE) {
      response = await updateUserLanguage({
        variables: { id, native: selected.value, learn },
      });
    } else {
      response = await updateUserLanguage({
        variables: { id, learn: selected.value, native },
      });
    }
  };

  return (
    <>
      <div className="language-bar">
        <SelectLanguage
          label="native"
          options={options}
          handleChange={handleSelecet}
          defaultValue={ctx.language.native}
          elemId={"native"}
        />
        <SelectLanguage
          label="learn"
          options={options}
          handleChange={handleSelecet}
          defaultValue={ctx.language.learn}
          elemId={"learn"}
        />
      </div>
    </>
  );
};

export default LanguageBar;
