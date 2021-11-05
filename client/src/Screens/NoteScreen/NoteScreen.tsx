import NotebookElement from "../../components/NotebookElement/NotebookElement";
import Title from "../../components/Title/Title";
import { useAuth } from "../../hooks/useAuth";
import "./NoteScreen.scss";

const NoteScreen = () => {
  useAuth("protect");
  return (
    <div className="note-screen">
      <Title text="Your Notebooks" isBackButton />
      <div className="note-screen__notebooks-list">
        <div>
          <NotebookElement title={"elo"} id="hello" />
          <NotebookElement title={"elo"} id="hello" />
          <NotebookElement title={"elo"} id="hello" />
          <NotebookElement title={"elo"} id="hello" />
        </div>
      </div>
    </div>
  );
};

export default NoteScreen;
