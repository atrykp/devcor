import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AddWordModal from "../../components/AddWordModal/AddWordModal";
import { BackButton, MenuButton } from "../../components/Button/Button";
import Flashcard from "../../components/Flashcard/Flashcard";
import IconButton from "../../components/IconButton/IconButton";
import Title from "../../components/Title/Title";
import { LanguageCtx } from "../../context/LanguageContext";
import { UserCtx } from "../../context/UserContext";
import { useAuth } from "../../hooks/useAuth";
import { useNotificationBar } from "../../hooks/useNotificationBar";
import "./FlashcardsScreen.scss";

type FlashcardsFilter = "all" | "iCan" | "iCant";
const filters: FlashcardsFilter[] = ["all", "iCan", "iCant"];

type FlashcardsInputs = {
  to: string;
  from: string;
};

const flashcard = [
  {
    date: "21.11.2021r",
    iCan: false,
    from: "polish",
    to: "english",
    fromWord: "cześć",
    toWord: "hello",
  },
  {
    date: "28.11.2021r",
    iCan: true,
    from: "polish",
    to: "english",
    fromWord: "świat",
    toWord: "world",
  },
];

const FlashcardsScreen = () => {
  useAuth("protect");
  const [currentFilter, setCurrentFilter] = useState<FlashcardsFilter>("all");
  const [isAddFlashcard, setIsAddFlashcard] = useState(false);
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
    console.log(data);
  };

  const handleAddFlashcard = () => {
    setIsAddFlashcard(false);
  };
  return (
    <div className="flashcards-screen">
      <BackButton />
      <Title>Flashcards</Title>
      <div className="flashcards-screen__top-bar">
        {filters.map((element: FlashcardsFilter) => (
          <MenuButton
            key={element}
            styles={currentFilter === element ? "button--menu-list-active" : ""}
            callback={() => setCurrentFilter(element)}
          >
            {element}
          </MenuButton>
        ))}
      </div>
      <div className="flashcards-screen__flashcards-wrapper">
        {flashcard.map((element: any) => (
          <Flashcard data={element} />
        ))}
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
