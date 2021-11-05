import "./NotebookElement.scss";

interface INotebookElement {
  title: string;
  id: string;
}

const NotebookElement = ({ title }: INotebookElement) => {
  return (
    <div className="notebook-element">
      <p className="notebook-element__title">{title}</p>
      <i className="fas fa-trash-alt"></i>
    </div>
  );
};

export default NotebookElement;
