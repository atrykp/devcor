import { useState } from "react";
import { BackButton, MenuButton } from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import { useAuth } from "../../hooks/useAuth";
import "./FlashcardsScreen.scss";

type FlashcardsFilter = "all" | "iCan" | "iCant";
const filters: FlashcardsFilter[] = ["all", "iCan", "iCant"];

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
        <h1>flashcard</h1>
      </div>
    </div>
  );
};

export default FlashcardsScreen;
