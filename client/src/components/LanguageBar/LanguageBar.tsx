import { useState } from "react";
import Select from "react-select";
import SelectLanguage from "../SelectLanguage/SelectLanguage";

import "./LanguageBar.scss";

const options = [
  { value: "english", label: "English" },
  { value: "polish", label: "Polish" },
  { value: "german", label: "German" },
];

const LanguageBar = () => {
  const [nativLang, setNativLang] = useState(null);
  const [learnLang, setLearnLang] = useState(null);

  const handleNativChange = (selected: any) => {
    setNativLang(selected);
  };
  const handleLearnChange = (selected: any) => {
    setNativLang(selected);
  };

  return (
    <>
      <div className="language-bar">
        <SelectLanguage
          label="native"
          options={options}
          handleChange={handleNativChange}
        />
        <SelectLanguage
          label="learn"
          options={options}
          handleChange={handleLearnChange}
        />
      </div>
    </>
  );
};

export default LanguageBar;
