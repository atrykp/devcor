import { useAuth } from "../../hooks/useAuth";
import "./LanguageScreen.scss";

const EnglishScreen = () => {
  useAuth("protect");
  return <h1>English screen</h1>;
};

export default EnglishScreen;
