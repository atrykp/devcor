import { useContext } from "react";
import NotebookElement from "../../components/NotebookElement/NotebookElement";
import Title from "../../components/Title/Title";
import { NotebookCtx } from "../../context/NotebookContext";
import { useAuth } from "../../hooks/useAuth";
import "./NoteScreen.scss";

const NoteScreen = () => {
  useAuth("protect");
  const noteCtx = useContext(NotebookCtx);
  console.log(noteCtx);
  return (
    <div className="note-screen">
      <Title text="Your Notebooks" isBackButton />
      <div className="note-screen__notebooks-list">
        <div>
          {!!noteCtx.notebooks.length ? (
            noteCtx.notebooks.map((element: any) => (
              <NotebookElement title={element.name} id={element.id} />
            ))
          ) : (
            <p>empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteScreen;
