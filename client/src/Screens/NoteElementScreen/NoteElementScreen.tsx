import { toInteger } from "lodash";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DATE_FORMAT } from "../../assets/consts";
import { INoteElement } from "../../components/NoteElement/NoteElement";
import Title from "../../components/Title/Title";
import { NotebookCtx } from "../../context/NotebookContext";
import { useAuth } from "../../hooks/useAuth";
import "./NoteElementScreen.scss";

const NoteElementScreen = () => {
  useAuth("protect");
  const [noteElement, setNoteElement] = useState<INoteElement>();
  const { id, notebookId } = useParams<{ id: string; notebookId: string }>();
  const noteCtx = useContext(NotebookCtx);

  useEffect(() => {
    if (noteCtx.userId) {
      const noteElement = noteCtx.notebooks
        .find((element: any) => element.id === notebookId)
        .notes.find((element: any) => element.id === id);
      setNoteElement(noteElement);
    }
  }, [noteCtx, id, notebookId]);

  return (
    <div className="note-element-screen">
      {noteElement ? (
        <>
          <Title text={noteElement.title} isBackButton />
          <p>{moment(toInteger(noteElement.date)).format(DATE_FORMAT)}</p>
          <p>{noteElement.text}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NoteElementScreen;
