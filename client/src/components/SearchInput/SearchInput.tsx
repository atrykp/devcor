import { useRef } from "react";
import Input from "../Input/Input";
import "./SearchInput.scss";

interface ISearchInput {
  searchCallback(value: string): void;
}

const SearchInput = ({ searchCallback, ...props }: ISearchInput) => {
  const searchInputRef = useRef<HTMLInputElement>(null!);
  return (
    <div className="search-input">
      <Input
        {...props}
        ref={searchInputRef}
        styles="search-input__input"
      ></Input>
      <i
        className="fas fa-search search-input__button"
        onClick={() => searchCallback(searchInputRef.current.value)}
      ></i>
    </div>
  );
};

export default SearchInput;
