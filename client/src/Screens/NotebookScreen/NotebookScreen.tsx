import { useMutation, gql } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import IconButton from "../../components/IconButton/IconButton";
import Title from "../../components/Title/Title";
import { NotebookCtx } from "../../context/NotebookContext";
import { useAuth } from "../../hooks/useAuth";
import "./NotebookScreen.scss";

const ADD_NOTE = gql`
  mutation AddNote($title: String, $text: String, $notebookId: String) {
    addNote(title: $title, text: $text, notebookId: $notebookId) {
      status
      message
    }
  }
`;

const NotebookScreen = () => {
  useAuth("protect");
  const [notebook, setNotebook] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const noteCtx = useContext(NotebookCtx);
  const [addNote] = useMutation(ADD_NOTE, {
    refetchQueries: ["GetNotebookObj"],
  });
  useEffect(() => {
    const [notebook] = noteCtx.notebooks.filter(
      (element: any) => element.id === id
    );
    setNotebook(notebook);
  }, []);

  return (
    <div>
      <Title text={notebook?.name} isBackButton />
      <p className="notebook-screen__info">Notes:</p>
      <div className="notebook-screen__notes">
        {!!notebook?.notes?.length ? <p>notebooks</p> : <p>null</p>}
      </div>
      <IconButton
        callback={() => console.log("add note")}
        styles="button--round button--add"
      >
        <i className="fas fa-plus"></i>
      </IconButton>
    </div>
  );
};

export default NotebookScreen;
