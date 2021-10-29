import { useContext, useRef, useState } from "react";
import _, { toInteger } from "lodash";

import Button, { BackButton } from "../../components/Button/Button";
import IgnoreWordModal from "../../components/IgnoreWordModal/IgnoreWordModal";

import { useAuth } from "../../hooks/useAuth";
import { useNotificationBar } from "../../hooks/useNotificationBar";

import "./ScanTextScreen.scss";
import Modal from "../../components/Modal/Modal";
import TextElement from "../../components/TextElement/TextElement";
import { LanguageCtx } from "../../context/LanguageContext";
import { useMutation, gql } from "@apollo/client";

const IGNORE_LIST = "ignoreList";
const WORDS_LIST = "wordsList";

const ADD_AND_TRANSLATE_WORDS = gql`
  mutation AddAndTranslateWords($words: [String]) {
    addAndTranslateWords(words: $words) {
      status
      message
    }
  }
`;

const ScanTextScreen = () => {
  useAuth("protect");
  const [isScanned, setIsScanned] = useState(false);
  const [scannedList, setScannedList] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [isIgnoreList, setIsIgnoreList] = useState(false);
  const [rangeValue, setRangeValue] = useState(3);
  const [popularityValue, setPopularityValue] = useState(3);
  const [checkBoxesValues, setCheckBoxesValues] = useState({
    ignoreList: false,
    wordsList: false,
  });

  const { showNotification } = useNotificationBar();

  const rangeRef = useRef<HTMLInputElement>(null!);
  const popularityRef = useRef<HTMLInputElement>(null!);
  const textAreaRef = useRef<HTMLTextAreaElement>(null!);
  const setCheckboxValue = (key: "ignoreList" | "wordsList") => {
    setCheckBoxesValues((prevValue) => ({
      ...prevValue,
      [key]: !prevValue[key],
    }));
  };

  const [addAndTranslate, { data }] = useMutation(ADD_AND_TRANSLATE_WORDS, {
    refetchQueries: ["GetLanguageObj"],
  });

  const langCtx = useContext(LanguageCtx);

  const onSubmit = () => {
    if (!textAreaRef.current.value) return setIsError(true);
    if (isError) setIsError(false);
    showNotification("scanning...", "pending");
    const formValues = {
      filters: {
        ...checkBoxesValues,
        range: rangeValue,
        popularity: popularityValue,
      },

      text: textAreaRef.current.value,
    };
    setIsScanned(true);

    let wordsFromTxt = formValues.text
      .replace(/[^a-zA-Z ]/g, "")
      .split(" ")
      .map((element: string) => element.toLowerCase());

    const counts: any = {};
    wordsFromTxt.forEach(function (element) {
      const word = element.toLowerCase();
      counts[word] = (counts[word] || 0) + 1;
    });

    wordsFromTxt = _.uniq(wordsFromTxt)
      .map((element) => element)
      .sort();

    wordsFromTxt = wordsFromTxt.filter(
      (element: string) =>
        element.length >= formValues.filters.range &&
        counts[element] >= formValues.filters.popularity
    );

    if (formValues.filters.ignoreList) {
      wordsFromTxt = wordsFromTxt.filter(
        (element: string) => !langCtx.ignoreWords.includes(element)
      );
    }
    if (formValues.filters.wordsList) {
      wordsFromTxt = wordsFromTxt.filter((element: string) => {
        const dictionaryArr: string[] = [];
        langCtx.dictionary.forEach((element: any) => {
          dictionaryArr.push(element.from);
          dictionaryArr.push(element.to);
        });
        return !dictionaryArr.includes(element);
      });
    }
    setScannedList(wordsFromTxt);
    showNotification("scanned", "done");
  };

  const closeModal = () => setIsIgnoreList(false);
  const closeScanned = () => setIsScanned(false);
  const removeWordFromList = (word: string) => {
    setScannedList((prevValue) =>
      prevValue.filter((element: string) => element !== word)
    );
  };
  const saveAndTranslate = async () => {
    const { data } = await addAndTranslate({
      variables: {
        words: scannedList,
      },
    });
  };

  return (
    <div className="scan-text-screen">
      <BackButton />
      <p className="scan-text-screen__title">Scan text</p>
      <div className="scan-text-screen__top-bar">
        <Button
          styles="button--secondary scan-text-screen__button-ignore"
          callback={() => setIsIgnoreList(true)}
        >
          Show ignore list
        </Button>
      </div>
      <textarea
        className="scan-text-screen__text-area"
        ref={textAreaRef}
      ></textarea>
      {isError && <p className="scan-text-screen__error">text is require</p>}

      <div className="scan-text-screen__check-boxes">
        <label htmlFor="ignoreList">
          <input
            type="checkbox"
            name="ignore my words"
            id="ignoreList"
            onChange={() => setCheckboxValue(IGNORE_LIST)}
          />
          Ignore words from my ignore list
        </label>

        <label htmlFor="wordsList">
          <input
            type="checkbox"
            name="ignore my words"
            id="wordsList"
            onChange={() => setCheckboxValue(WORDS_LIST)}
          />
          Ignore words from my list
        </label>
      </div>
      <div className="scan-text-screen__slider-input">
        <input
          type="range"
          min="0"
          max="20"
          defaultValue={rangeValue}
          onChange={() => setRangeValue(toInteger(rangeRef.current.value))}
          ref={rangeRef}
        />
        <p>min. word length: {rangeValue}</p>
      </div>
      <div className="scan-text-screen__slider-input">
        <input
          type="range"
          min="0"
          max="20"
          defaultValue={popularityValue}
          onChange={() =>
            setPopularityValue(toInteger(popularityRef.current.value))
          }
          ref={popularityRef}
        />
        <p>popularity: {popularityValue}</p>
      </div>

      <Button styles="scan-text-screen__scan-btn" callback={() => onSubmit()}>
        Scan
      </Button>
      {isIgnoreList && <IgnoreWordModal closeModal={closeModal} />}
      {isScanned && (
        <Modal
          title="scanning text"
          cancelCallback={closeScanned}
          cancelTxt="close"
          confirmTxt="save&translate"
          confirmCallback={() => saveAndTranslate()}
        >
          {!!scannedList.length ? (
            <div className="scan-text-screen__words-list">
              {scannedList.map((element: string) => (
                <TextElement
                  key={element}
                  onRemove={() => removeWordFromList(element)}
                >
                  {element}
                </TextElement>
              ))}
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ScanTextScreen;
