import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLazyQuery, gql } from "@apollo/client";

import AddWordModal from "../../components/AddWordModal/AddWordModal";
import { BackButton, MenuButton } from "../../components/Button/Button";
import IconButton from "../../components/IconButton/IconButton";
import SearchInput from "../../components/SearchInput/SearchInput";
import WordElement, {
  IWordElement,
} from "../../components/WordElement/WordElement";

import { LanguageCtx } from "../../context/LanguageContext";

import { useAddWord } from "../../hooks/useAddWord";
import { useAuth } from "../../hooks/useAuth";
import { useNotificationBar } from "../../hooks/useNotificationBar";

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
  const [searchResult, setSearchResult] = useState<any[] | null>(null);
  const { showNotification } = useNotificationBar();
  const langCtx = useContext(LanguageCtx);
  const { isAddWord, handleAddWordModal, ctx, ...config } = useAddWord();
  const history = useHistory();
  const [searchDictionary, { data, error, loading }] =
    useLazyQuery(DICTIONARY_SEARCH);

  const onSearch = async (value: string) => {
    searchDictionary({ variables: { userQuery: value } });
  };

  useEffect(() => {
    if (data) {
      showNotification("search results", "done");
      setSearchResult(data.searchDictionary);
    } else if (loading) {
      showNotification("searching...", "pending");
    } else if (error) {
      showNotification("something went wrong", "error");
    }
  }, [data, loading, error, showNotification]);

  return (
    <div className="dictionary-screen">
      <BackButton />
      <p className="dictionary-screen__title">Dictionary</p>
      <div className="dictionary-screen__buttons">
        <MenuButton callback={() => history.push("/language/scanText")}>
          Scan text
        </MenuButton>
        <MenuButton
          callback={() => {
            setIsSearch((prevValue) => !prevValue);
            if (isSearch) {
              setSearchResult(null);
            }
          }}
        >
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
        {!isSearch &&
          (langCtx.dictionary.length > 0 ? (
            langCtx.dictionary.map((element: IWordElement) => (
              <WordElement {...element} key={element.id} />
            ))
          ) : (
            <p>its nothing here</p>
          ))}
        {isSearch &&
          searchResult &&
          (!!searchResult.length ? (
            searchResult.map((element: any) => (
              <WordElement {...element} key={element.id} />
            ))
          ) : (
            <p>no search result</p>
          ))}
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
