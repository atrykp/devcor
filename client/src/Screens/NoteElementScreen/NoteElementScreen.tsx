import { toInteger } from "lodash";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useMutation, gql } from "@apollo/client";

import { DATE_FORMAT } from "../../assets/consts";
import Modal from "../../components/Modal/Modal";
import { INoteElement } from "../../components/NoteElement/NoteElement";
import Title from "../../components/Title/Title";
import { NotebookCtx } from "../../context/NotebookContext";
import { useAuth } from "../../hooks/useAuth";
import "./NoteElementScreen.scss";
import { useNotificationBar } from "../../hooks/useNotificationBar";

const REMOVE_NOTE = gql`
  mutation RemoveNote($noteId: ID!, $notebookId: ID!) {
    removeNote(noteId: $noteId, notebookId: $notebookId) {
      status
      message
    }
  }
`;

const NoteElementScreen = () => {
  useAuth("protect");
  const history = useHistory();
  const [isRemove, setIsRemove] = useState(false);
  const [noteElement, setNoteElement] = useState<INoteElement>();
  const { id, notebookId } = useParams<{ id: string; notebookId: string }>();
  const noteCtx = useContext(NotebookCtx);
  const { showNotification } = useNotificationBar();

  const [removeNote] = useMutation(REMOVE_NOTE, {
    refetchQueries: ["GetNotebookObj"],
  });

  const removeNoteElement = async () => {
    try {
      showNotification("removing", "pending");
      await removeNote({
        variables: {
          noteId: id,
          notebookId,
        },
      });
      history.goBack();
      showNotification("removed", "done");
    } catch (error) {
      showNotification("couldn't remove", "error");
    }
  };

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
          confirmCallback={removeNoteElement}
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
