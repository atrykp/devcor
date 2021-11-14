import { toInteger } from "lodash";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
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
import Input from "../../components/Input/Input";

const REMOVE_NOTE = gql`
  mutation RemoveNote($noteId: ID!, $notebookId: ID!) {
    removeNote(noteId: $noteId, notebookId: $notebookId) {
      status
      message
    }
  }
`;
const EDIT_NOTE = gql`
  mutation EditNote(
    $noteId: ID!
    $notebookId: ID!
    $title: String
    $text: String
  ) {
    editNote(
      noteId: $noteId
      notebookId: $notebookId
      title: $title
      text: $text
    ) {
      status
      message
    }
  }
`;

const NoteElementScreen = () => {
  useAuth("protect");
  const history = useHistory();
  const [isRemove, setIsRemove] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [noteElement, setNoteElement] = useState<INoteElement>();
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { id, notebookId } = useParams<{ id: string; notebookId: string }>();
  const noteCtx = useContext(NotebookCtx);
  const { showNotification } = useNotificationBar();

  const [removeNote] = useMutation(REMOVE_NOTE, {
    refetchQueries: ["GetNotebookObj"],
  });
  const [editNote] = useMutation(EDIT_NOTE, {
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

  const onUpdate = async () => {
    try {
      showNotification("updating", "pending");
      await editNote({
        variables: {
          noteId: id,
          notebookId,
          title: titleRef.current?.value,
          text: textRef.current?.value,
        },
      });
      setIsEdit(false);
      showNotification("edited", "done");
    } catch (error) {
      showNotification("couldn't edit", "error");
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
          {isEdit ? (
            <Input ref={titleRef} defaultValue={noteElement.title} />
          ) : (
            <Title text={noteElement.title} isBackButton />
          )}
          <div className="note-element-screen__top-bar">
            <p className="note-element-screen__date">
              {moment(toInteger(noteElement.date)).format(DATE_FORMAT)}
            </p>
            <div className="note-element-screen__buttons">
              {isEdit ? (
                <i className="fas fa-save" onClick={onUpdate}></i>
              ) : (
                <i className="fas fa-edit" onClick={() => setIsEdit(true)}></i>
              )}
              {!isEdit ? (
                <i
                  className="fas fa-trash-alt"
                  onClick={() => setIsRemove(true)}
                ></i>
              ) : (
                <i
                  className="fas fa-times"
                  onClick={() => setIsEdit(false)}
                ></i>
              )}
            </div>
          </div>
          {isEdit ? (
            <textarea
              defaultValue={noteElement.text}
              ref={textRef}
              className="note-element-screen__text-area"
            />
          ) : (
            <p className="note-element-screen__text">{noteElement.text}</p>
          )}
        </>
      ) : (
        <p className="note-element-screen__loading">Loading...</p>
      )}
    </div>
  );
};

export default NoteElementScreen;
