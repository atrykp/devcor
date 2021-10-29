import { BackButton } from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import { useAuth } from "../../hooks/useAuth";
import "./FlashcardsScreen.scss";

const FlashcardsScreen = () => {
  useAuth("protect");
  return (
    <div className="flashcards-screen">
      <BackButton />
      <Title>Flashcards</Title>
      <p className="flashcards-screen__title">Flashcards</p>
      <div className="flashcards-screen__top-bar">
        <button>all</button>
        <button>ican</button>
        <button>icant</button>
      </div>
      <div flashcards-screen__flashcards-wrapper>
        <h1>flashcard</h1>
      </div>
    </div>
  );
};

export default FlashcardsScreen;
