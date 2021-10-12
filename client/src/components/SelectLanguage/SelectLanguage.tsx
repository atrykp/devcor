import Select from "react-select";
import AsyncSelect from "react-select/async";

import "./SelectLanguage.scss";

interface ISelectLanguage {
  label: string;
  handleChange(selected: any, elemId: any): void;
  options: any;
  defaultValue: string;
  elemId: string;
}

const SelectLanguage = ({
  label,
  handleChange,
  options,
  defaultValue,
  elemId,
}: ISelectLanguage) => {
  const setDefaultLanguage = () =>
    options.find((elem: any) => elem.value === defaultValue);
  return (
    <div className="select-language">
      <p>{label}:</p>

      <Select
        onChange={(select) => handleChange(select, elemId)}
        options={options}
        placeholder="language"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#cffafe",
            primary: "#0891b2",
          },
        })}
        className="select-language-container"
        value={setDefaultLanguage()}
      />
    </div>
  );
};

export default SelectLanguage;
