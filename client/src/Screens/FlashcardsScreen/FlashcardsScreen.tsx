import { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useNotificationBar } from "../../hooks/useNotificationBar";
import { useAuth } from "../../hooks/useAuth";

import AddWordModal from "../../components/AddWordModal/AddWordModal";
import { MenuButton } from "../../components/Button/Button";
import Flashcard, { IFlashcard } from "../../components/Flashcard/Flashcard";
import IconButton from "../../components/IconButton/IconButton";
import Title from "../../components/Title/Title";

import { LanguageCtx } from "../../context/LanguageContext";
import { UserCtx } from "../../context/UserContext";

import "./FlashcardsScreen.scss";

type FlashcardsFilter = "all" | "iCan" | "iCant";
const filters: FlashcardsFilter[] = ["all", "iCan", "iCant"];

type FlashcardsInputs = {
  to: string;
  from: string;
};

const ADD_FLASHCARD = gql`
  mutation addFlashcard(
    $from: String
    $to: String
    $fromLang: String
    $toLang: String
  ) {
    addFlashcard(from: $from, to: $to, fromLang: $fromLang, toLang: $toLang) {
      status
      message
    }
  }
`;

const FlashcardsScreen = () => {
  useAuth("protect");
  const [currentFilter, setCurrentFilter] = useState<FlashcardsFilter>("all");
  const [isAddFlashcard, setIsAddFlashcard] = useState(false);

  const [addFlashcard] = useMutation(ADD_FLASHCARD, {
    refetchQueries: ["GetLanguageObj"],
  });
  const { showNotification } = useNotificationBar();
  const langCtx = useContext(LanguageCtx);
  const ctx = useContext(UserCtx);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FlashcardsInputs>();

  const onSubmit: SubmitHandler<FlashcardsInputs> = async (data) => {
    showNotification("Adding flashcard", "pending");
    const { data: saveResult } = await addFlashcard({
      variables: {
        from: data.from,
        to: data.to,
        fromLang: ctx.language.native,
        toLang: ctx.language.learn,
      },
    });
    if (!saveResult.addFlashcard.status)
      return showNotification(saveResult.addFlashcard.message, "error");
    showNotification(saveResult.addFlashcard.message, "done");
    reset();
    setIsAddFlashcard(false);
  };

  const handleAddFlashcard = () => {
    setIsAddFlashcard(false);
  };

  const filterFlashcards = (filter: FlashcardsFilter) => {
    return langCtx.flashcards.filter((element: IFlashcard) => {
      if (filter === "iCan") return element.iCan;
      if (filter === "iCant") return !element.iCan;
      return element;
    });
  };
  return (
    <div className="flashcards-screen">
      <Title text="Flashcards" isBackButton />
      <div className="flashcards-screen__top-bar">
        {filters.map((element: FlashcardsFilter) => (
          <MenuButton
            key={element}
            styles={currentFilter === element ? "button--menu-list-active" : ""}
            callback={() => setCurrentFilter(element)}
          >
            {`${element} (${filterFlashcards(element).length})`}
          </MenuButton>
        ))}
      </div>
      <div className="flashcards-screen__flashcards-wrapper">
        {!langCtx?.flashcards.length ? (
          <p className="flashcards-screen__empty-component">
            Add your first flashcard
          </p>
        ) : (
          [...filterFlashcards(currentFilter)]
            .reverse()
            .map((element: IFlashcard) => (
              <Flashcard data={element} key={element.id} />
            ))
        )}
      </div>
      <IconButton
        callback={() => {
          setIsAddFlashcard(true);
        }}
        styles="button--round button--add"
      >
        <i className="fas fa-plus"></i>
      </IconButton>
      {isAddFlashcard && (
        <AddWordModal
          ctx={ctx}
          handleAddWordModal={handleAddFlashcard}
          reset={reset}
          register={register}
          handleSubmit={handleSubmit}
          title={"Add flashcard"}
          onSubmit={onSubmit}
          errors={errors}
        />
      )}
    </div>
  );
};

export default FlashcardsScreen;
