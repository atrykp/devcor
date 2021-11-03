import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { MenuButton } from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import "./Flashcard.scss";
import { useNotificationBar } from "../../hooks/useNotificationBar";
import EditWordElement from "../EditWordElement/EditWordElement";
import _ from "lodash";

type FlashcardsSite = "front" | "back";

interface IFlashcard {
  data: {
    date: string;
    iCan: boolean;
    from: string;
    to: string;
    fromLang: string;
    toLang: string;
    id: string;
  };
}

const REMOVE_FLASHCARD = gql`
  mutation RemoveFlashcard($flashcardId: ID!) {
    removeFlashcard(flashcardId: $flashcardId) {
      status
      message
    }
  }
`;
const EDIT_FLASHCARD = gql`
  mutation Editflashcard($flashcardId: ID!, $from: String, $to: String) {
    editFlashcard(flashcardId: $flashcardId, from: $from, to: $to) {
      status
      message
    }
  }
`;
const UPDATE_FLASHCARD_STATUS = gql`
  mutation UpdateFlashcardStatus($flashcardId: ID!, $iCan: Boolean) {
    updateFlashcardStatus(flashcardId: $flashcardId, iCan: $iCan) {
      status
      message
    }
  }
`;

const Flashcard = ({ data }: IFlashcard) => {
  const [currentSite, setCurrentSite] = useState<FlashcardsSite>("front");
  const [isEdit, setIsEdit] = useState(false);
  const { from, to, fromLang, toLang, iCan, id } = data;
  const { showNotification } = useNotificationBar();
  const changeSite = () => {
    if (currentSite === "front") return setCurrentSite("back");
    setCurrentSite("front");
  };
  const [removeFlashcard] = useMutation(REMOVE_FLASHCARD, {
    refetchQueries: ["GetLanguageObj"],
  });
  const [editFlashcard] = useMutation(EDIT_FLASHCARD, {
    refetchQueries: ["GetLanguageObj"],
  });
  const [updateFlashcardStatus] = useMutation(UPDATE_FLASHCARD_STATUS, {
    refetchQueries: ["GetLanguageObj"],
  });

  const removeWordElement = async () => {
    try {
      showNotification("removing", "pending");
      await removeFlashcard({
        variables: {
          flashcardId: id,
        },
      });
      showNotification("removed", "done");
    } catch (error) {
      showNotification("couldn't remove", "error");
    }
  };

  const onEdit = async (from: string, to: string) => {
    showNotification("Updating flashcard", "pending");

    const inputsValues = {
      from,
      to,
    };
    const editObj = _.pickBy(inputsValues, _.identity);
    try {
      await editFlashcard({ variables: { ...editObj, flashcardId: id } });
      showNotification("Flashcard updated", "done");
      setIsEdit(false);
    } catch (error) {
      showNotification("couldn't update", "error");
    }
  };
  const onUpdateStatus = async () => {
    showNotification("Updating flashcard", "pending");

    try {
      await updateFlashcardStatus({
        variables: { iCan: !iCan, flashcardId: id },
      });
      showNotification("Flashcard updated", "done");
    } catch (error) {
      showNotification("couldn't update", "error");
    }
  };
  return (
    <div
      className={`flashcard ${currentSite === "back" ? "flashcard--back" : ""}`}
    >
      {isEdit ? (
        <EditWordElement
          from={from}
          to={to}
          closeEdit={() => setIsEdit(false)}
          onEditWord={onEdit}
        />
      ) : (
        <>
          {" "}
          <div className="flashcard__text-wrapper">
            <div className="flashcard__top-bar">
              <i
                className="fas fa-pencil-alt"
                onClick={() => setIsEdit(true)}
              ></i>
              <p className="flashcard__text-language">
                {currentSite === "front" ? fromLang : toLang}
              </p>
            </div>
            <div
              className={`flashcard__translation ${
                currentSite === "back" ? "flashcard__translation--back" : ""
              }`}
            >
              <p className="flashcard__text">
                {currentSite === "front" ? from : to}
              </p>
            </div>
          </div>
          <div className="flashcard__buttons">
            <div className="flashcard__can-button">
              <MenuButton styles="flashcard__button" callback={onUpdateStatus}>
                iCan
              </MenuButton>
              {iCan && <i className="fas fa-check flashcard__can-symbol"></i>}
            </div>
            <IconButton
              styles="button--round flashcard__button-turn-over"
              callback={changeSite}
            >
              <i className="fas fa-sync-alt"></i>
            </IconButton>
            <MenuButton styles="flashcard__button" callback={removeWordElement}>
              remove
            </MenuButton>
          </div>
        </>
      )}
    </div>
  );
};

export default Flashcard;
