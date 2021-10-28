import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { useLazyQuery, gql } from "@apollo/client";

import AddWordModal from "../../components/AddWordModal/AddWordModal";
import { MenuButton } from "../../components/Button/Button";
import IconButton from "../../components/IconButton/IconButton";
import SearchInput from "../../components/SearchInput/SearchInput";
import WordElement, {
  IWordElement,
} from "../../components/WordElement/WordElement";

import { LanguageCtx } from "../../context/LanguageContext";

import { useAddWord } from "../../hooks/useAddWord";
import { useAuth } from "../../hooks/useAuth";

import "./DictionaryScreen.scss";

const DICTIONARY_SEARCH = gql`
  query SearchDictionary($userQuery: String!) {
    searchDictionary(userQuery: $userQuery) {
      fromLang
      toLang
      from
      to
      id
    }
  }
`;

const DictionaryScreen = () => {
  useAuth("protect");
  const [isSearch, setIsSearch] = useState(false);
  const langCtx = useContext(LanguageCtx);
  const { isAddWord, handleAddWordModal, ctx, ...config } = useAddWord();
  const history = useHistory();
  const [searchDictionary, { data }] = useLazyQuery(DICTIONARY_SEARCH);

  const onSearch = (value: string) => {
    console.log(value);
    const result = searchDictionary({ variables: { userQuery: value } });
  };

  return (
    <div className="dictionary-screen">
      <p className="dictionary-screen__title">Dictionary</p>
      <div className="dictionary-screen__buttons">
        <MenuButton callback={() => history.push("/language/scanText")}>
          Scan text
        </MenuButton>
        <MenuButton callback={() => setIsSearch((prevValue) => !prevValue)}>
          {isSearch ? "Close X" : "Search"}
        </MenuButton>
        <IconButton
          callback={() => {
            handleAddWordModal(true);
          }}
          styles="button--round dictionary-screen__button--add"
        >
          <i className="fas fa-plus"></i>
        </IconButton>
      </div>
      <div className="dictionary-screen__words">
        {isSearch && <SearchInput searchCallback={onSearch} />}
        {langCtx.dictionary.length > 0 ? (
          langCtx.dictionary.map((element: IWordElement) => (
            <WordElement {...element} key={element.id} />
          ))
        ) : (
          <p>its nothing here</p>
        )}
      </div>
      {isAddWord && (
        <AddWordModal
          ctx={ctx}
          handleAddWordModal={handleAddWordModal}
          {...config}
        />
      )}
    </div>
  );
};

export default DictionaryScreen;
