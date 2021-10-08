import Card from "../../components/Card/Card";
import LanguageBar from "../../components/LanguageBar/LanguageBar";
import { useAuth } from "../../hooks/useAuth";
import "./LanguageScreen.scss";

const LanguageScreen = () => {
  useAuth("protect");
  return (
    <div className="language-screen">
      <LanguageBar />
      <Card>Dictionary</Card>
      <Card>Flashcards</Card>
      <Card>Repeat</Card>
    </div>
  );
};

export default LanguageScreen;
