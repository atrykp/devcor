import { useContext, useRef, useState } from "react";
import IconButton from "../../components/IconButton/IconButton";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import NotebookElement from "../../components/NotebookElement/NotebookElement";
import Title from "../../components/Title/Title";
import { NotebookCtx } from "../../context/NotebookContext";
import { useAuth } from "../../hooks/useAuth";
import "./NoteScreen.scss";

const NoteScreen = () => {
  useAuth("protect");
  const [isAddNotebook, setIsAddNotebook] = useState(false);
  const noteCtx = useContext(NotebookCtx);
  const notebookNameRef = useRef<HTMLInputElement>(null!);
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
        <IconButton
          callback={() => {
            setIsAddNotebook(true);
          }}
          styles="button--round button--add"
        >
          <i className="fas fa-plus"></i>
        </IconButton>
        {isAddNotebook && (
          <Modal
            title="Add notebook"
            confirmTxt={"save"}
            cancelTxt={"cancel"}
            cancelCallback={() => {
              setIsAddNotebook(false);
            }}
            confirmCallback={() => console.log(notebookNameRef.current.value)}
          >
            <div className="modal__inputs">
              <Input placeholder="Notebook name" ref={notebookNameRef} />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default NoteScreen;
