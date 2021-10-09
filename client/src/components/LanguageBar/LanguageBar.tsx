import { useState } from "react";
import Select from "react-select";

import "./LanguageBar.scss";

const options = [
  { value: "english", label: "English" },
  { value: "polish", label: "Polish" },
  { value: "german", label: "German" },
];

const LanguageBar = () => {
  const [lang, setLang] = useState(null);

  const handleChange = (selected: any) => {
    setLang(selected);
  };

  return (
    <>
      <div className="language-bar">
        <div className="language-bar__lang">
          <p>native:</p>
          <Select
            value={lang}
            onChange={handleChange}
            options={options}
            placeholder="language"
            className="language-bar__select"
            classNamePrefix="language-bar__select--option"
          />
        </div>
        <div className="language-bar__lang">
          <p>learn:</p>
          <Select
            value={lang}
            onChange={handleChange}
            options={options}
            placeholder="language"
            className="language-bar__select"
          />
        </div>
      </div>
    </>
  );
};

export default LanguageBar;
