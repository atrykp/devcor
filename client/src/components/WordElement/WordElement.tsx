import { useMutation, gql } from "@apollo/client";
import _ from "lodash";
import { useState } from "react";
import EditWordElement from "../EditWordElement/EditWordElement";
import { useNotificationBar } from "../../hooks/useNotificationBar";
import "./WordElement.scss";
import Modal from "../Modal/Modal";

export interface IWordElement {
  fromLang: string;
  toLang: string;
  from: string;
  to: string;
  id: string;
}

const REMOVE_WORD = gql`
  mutation RemoveWord($wordId: ID!) {
    removeWord(wordId: $wordId) {
      status
      message
    }
  }
`;
const EDIT_WORD = gql`
  mutation EditWord($wordId: ID!, $from: String, $to: String) {
    editWord(wordId: $wordId, from: $from, to: $to) {
      status
      message
    }
  }
`;

const WordElement = ({ fromLang, toLang, from, to, id }: IWordElement) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const { showNotification } = useNotificationBar();

  const [removeWord] = useMutation(REMOVE_WORD, {
    refetchQueries: ["GetLanguageObj"],
  });
  const [editWord] = useMutation(EDIT_WORD, {
    refetchQueries: ["GetLanguageObj"],
  });

  const onEditWord = async (fromVal: string, toVal: string) => {
    showNotification("Updating words", "pending");

    const inputsValues = {
      from: fromVal,
      to: toVal,
    };
    const editObj = _.pickBy(inputsValues, _.identity);
    try {
      await editWord({ variables: { ...editObj, wordId: id } });
      showNotification("Words updated", "done");
      setIsEdit(false);
    } catch (error) {
      showNotification("couldn't update", "error");
    }
  };

  const removeWordElement = async () => {
    try {
      showNotification("removing", "pending");
      await removeWord({
        variables: {
          wordId: id,
        },
      });
      showNotification("removed", "done");
    } catch (error) {
      showNotification("couldn't remove", "error");
    }
  };

  const closeEdit = () => setIsEdit(false);
  return (
    <>
      {isRemove && (
        <Modal
          title="Are you sure?"
          cancelCallback={() => setIsRemove(false)}
          confirmCallback={removeWordElement}
          confirmTxt="yes"
          cancelTxt="no"
        />
      )}
      <div className="word-element">
        {isEdit ? (
          <EditWordElement
            from={from}
            to={to}
            onEditWord={onEditWord}
            closeEdit={closeEdit}
          />
        ) : (
          <>
            <div className="word-element__translation">
              <div className="word-element__from">
                <p className="word-element__translation-language">{fromLang}</p>
                <p
                  className={`word-element__translation-word ${
                    from.length > 7 && from.length <= 13
                      ? "word-element__translation-word--small"
                      : ""
                  } ${
                    from.length > 13
                      ? "word-element__translation-word--xsmall"
                      : ""
                  }`}
                >
                  {from}
                </p>
              </div>
              <div className="word-element__to">
                <p className="word-element__translation-language">{toLang}</p>
                <p
                  className={`word-element__translation-word ${
                    from.length > 7 && from.length <= 13
                      ? "word-element__translation-word--small"
                      : ""
                  } ${
                    from.length > 13
                      ? "word-element__translation-word--xsmall"
                      : ""
                  }`}
                >
                  {to}
                </p>
              </div>
            </div>
            <div className="word-element__buttons">
              <i className="fas fa-edit" onClick={() => setIsEdit(true)}></i>
              <i
                className="fas fa-trash-alt"
                onClick={() => setIsRemove(true)}
              ></i>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WordElement;
