import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation, gql } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";

import IconButton from "../../components/IconButton/IconButton";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import NoteElement, {
  INoteElement,
} from "../../components/NoteElement/NoteElement";
import Title from "../../components/Title/Title";

import { NotebookCtx } from "../../context/NotebookContext";

import { useAuth } from "../../hooks/useAuth";
import { useNotificationBar } from "../../hooks/useNotificationBar";

import "./NotebookScreen.scss";

const ADD_NOTE = gql`
  mutation AddNote($title: String, $text: String, $notebookId: String) {
    addNote(title: $title, text: $text, notebookId: $notebookId) {
      status
      message
    }
  }
`;

type NoteInputs = {
  title: string;
  text: string;
};

const NotebookScreen = () => {
  useAuth("protect");
  const [isAddNote, setIsAddNote] = useState(false);
  const [notebook, setNotebook] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const noteCtx = useContext(NotebookCtx);
  const [addNote] = useMutation(ADD_NOTE, {
    refetchQueries: ["GetNotebookObj"],
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteInputs>();

  const { showNotification } = useNotificationBar();

  const onSubmit: SubmitHandler<NoteInputs> = async (data) => {
    showNotification("Adding note", "pending");
    const { data: saveResult } = await addNote({
      variables: {
        title: data.title,
        text: data.text,
        notebookId: id,
      },
    });
    if (!saveResult.addNote.status)
      return showNotification(saveResult.addNote.message, "error");
    showNotification(saveResult.addNote.message, "done");
    reset();
    setIsAddNote(false);
  };
  useEffect(() => {
    const [notebook] = noteCtx.notebooks.filter(
      (element: any) => element.id === id
    );
    setNotebook(notebook);
  }, [id, noteCtx]);

  return (
    <div>
      {isAddNote && (
        <Modal
          title="Add note"
          confirmTxt={"save"}
          cancelTxt={"cancel"}
          cancelCallback={() => {
            reset();
            setIsAddNote(false);
          }}
          confirmCallback={() => handleSubmit(onSubmit)()}
        >
          <div className="modal__inputs">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                styles={errors?.title ? "input--error" : ""}
                placeholder="title"
                {...register("title", { required: true })}
              />
              <textarea
                placeholder="text"
                {...register("text", { required: true })}
                className="notebook-screen__text-area"
              />
            </form>
          </div>
        </Modal>
      )}
      <Title text={notebook?.name} isBackButton />
      <p className="notebook-screen__info">Notes:</p>
      <div className="notebook-screen__notes">
        {!!notebook?.notes?.length ? (
          notebook.notes.map((element: INoteElement) => (
            <NoteElement
              title={element.title}
              text={element.text}
              date={element.date}
              key={element.id}
              id={element.id}
              notebookId={id}
            />
          ))
        ) : (
          <p>null</p>
        )}
      </div>
      <IconButton
        callback={() => setIsAddNote(true)}
        styles="button--round button--add"
      >
        <i className="fas fa-plus"></i>
      </IconButton>
    </div>
  );
};

export default NotebookScreen;
