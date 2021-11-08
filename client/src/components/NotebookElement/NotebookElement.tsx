import { useHistory } from "react-router";
import "./NotebookElement.scss";

interface INotebookElement {
  title: string;
  id: string;
  onRemove(id: string): void;
}

const NotebookElement = ({ title, onRemove, id }: INotebookElement) => {
  const history = useHistory();
  return (
    <>
      <div
        className="notebook-element"
        onClick={() => history.push(`notebook/${id}`)}
      >
        <p className="notebook-element__title">{title}</p>
        <i
          className="fas fa-trash-alt"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
        ></i>
      </div>
    </>
  );
};

export default NotebookElement;
