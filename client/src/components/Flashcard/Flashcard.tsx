import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { MenuButton } from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import "./Flashcard.scss";
import { useNotificationBar } from "../../hooks/useNotificationBar";

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

const Flashcard = ({ data }: IFlashcard) => {
  const [currentSite, setCurrentSite] = useState<FlashcardsSite>("front");
  const { from, to, fromLang, toLang, iCan, id } = data;
  const { showNotification } = useNotificationBar();
  const changeSite = () => {
    if (currentSite === "front") return setCurrentSite("back");
    setCurrentSite("front");
  };
  const [removeFlashcard] = useMutation(REMOVE_FLASHCARD, {
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
  return (
    <div
      className={`flashcard ${currentSite === "back" ? "flashcard--back" : ""}`}
    >
      <div className="flashcard__text-wrapper">
        <p className="flashcard__text-language">
          {currentSite === "front" ? fromLang : toLang}
        </p>
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
          <MenuButton styles="flashcard__button">iCan</MenuButton>
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
    </div>
  );
};

export default Flashcard;
