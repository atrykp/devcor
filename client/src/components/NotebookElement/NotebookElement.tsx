import "./NotebookElement.scss";

interface INotebookElement {
  title: string;
  id: string;
  onRemove(id: string): void;
}

const NotebookElement = ({ title, onRemove, id }: INotebookElement) => {
  return (
    <>
      <div
        className="notebook-element"
        onClick={() => console.log("open notebook")}
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
