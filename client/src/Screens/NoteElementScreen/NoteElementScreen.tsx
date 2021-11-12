import { toInteger } from "lodash";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DATE_FORMAT } from "../../assets/consts";
import Modal from "../../components/Modal/Modal";
import { INoteElement } from "../../components/NoteElement/NoteElement";
import Title from "../../components/Title/Title";
import { NotebookCtx } from "../../context/NotebookContext";
import { useAuth } from "../../hooks/useAuth";
import "./NoteElementScreen.scss";

const NoteElementScreen = () => {
  useAuth("protect");
  const [isRemove, setIsRemove] = useState(false);
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
      {isRemove && (
        <Modal
          title="Are you sure?"
          confirmCallback={() => console.log("remove")}
          cancelCallback={() => setIsRemove(false)}
        />
      )}
      {noteElement ? (
        <>
          <Title text={noteElement.title} isBackButton />
          <div className="note-element-screen__top-bar">
            <p className="note-element-screen__date">
              {moment(toInteger(noteElement.date)).format(DATE_FORMAT)}
            </p>
            <div className="note-element-screen__buttons">
              <i
                className="fas fa-edit"
                onClick={() => console.log("click")}
              ></i>
              <i
                className="fas fa-trash-alt"
                onClick={() => setIsRemove(true)}
              ></i>
            </div>
          </div>
          <p className="note-element-screen__text">{noteElement.text}</p>
        </>
      ) : (
        <p className="note-element-screen__loading">Loading...</p>
      )}
    </div>
  );
};

export default NoteElementScreen;
