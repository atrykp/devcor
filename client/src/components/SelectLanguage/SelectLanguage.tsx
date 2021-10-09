import Select from "react-select";
import "./SelectLanguage.scss";

interface ISelectLanguage {
  label: string;
  handleChange(selected: any): void;
  options: any;
}

const SelectLanguage = ({ label, handleChange, options }: ISelectLanguage) => {
  return (
    <div className="select-language">
      <p>{label}:</p>
      <Select
        onChange={handleChange}
        options={options}
        placeholder="language"
        className="select-language__select"
      />
    </div>
  );
};

export default SelectLanguage;
