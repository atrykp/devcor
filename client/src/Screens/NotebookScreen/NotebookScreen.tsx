import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import IconButton from "../../components/IconButton/IconButton";
import NotebookElement from "../../components/NotebookElement/NotebookElement";
import Title from "../../components/Title/Title";
import { NotebookCtx } from "../../context/NotebookContext";
import { useAuth } from "../../hooks/useAuth";
import "./NotebookScreen.scss";

const NotebookScreen = () => {
  useAuth("protect");
  const [notebook, setNotebook] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const noteCtx = useContext(NotebookCtx);

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
      <div className="notebook-screen__notes"></div>
      <IconButton
        callback={() => {
          console.log("add new note");
        }}
        styles="button--round button--add"
      >
        <i className="fas fa-plus"></i>
      </IconButton>
    </div>
  );
};

export default NotebookScreen;
