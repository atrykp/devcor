import { useState } from "react";
import { BackButton, MenuButton } from "../../components/Button/Button";
import Flashcard from "../../components/Flashcard/Flashcard";
import Title from "../../components/Title/Title";
import { useAuth } from "../../hooks/useAuth";
import "./FlashcardsScreen.scss";

type FlashcardsFilter = "all" | "iCan" | "iCant";
const filters: FlashcardsFilter[] = ["all", "iCan", "iCant"];

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
    </div>
  );
};

export default FlashcardsScreen;
