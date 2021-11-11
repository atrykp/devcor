import _, { toInteger } from "lodash";
import moment from "moment";
import { useHistory } from "react-router";
import { DATE_FORMAT } from "../../assets/consts";
import "./NoteElement.scss";

export interface INoteElement {
  title: string;
  text: string;
  date: string;
  id: string;
  notebookId?: string;
}

const NoteElement = ({ title, text, date, id, notebookId }: INoteElement) => {
  const history = useHistory();
  return (
    <div
      className="note-element"
      onClick={() => history.push(`/notebook/note/${notebookId}/${id}`)}
    >
      <div className="note-element__top">
        <p className="note-element__title">
          {_.truncate(title, {
            length: 25,
            separator: /,? +/,
          })}
        </p>
        <p className="note-element__date">
          {moment(toInteger(date)).format(DATE_FORMAT)}
        </p>
      </div>
      <div className="note-element__text">
        {_.truncate(text, {
          length: 45,
          separator: /,? +/,
        })}
      </div>
    </div>
  );
};

export default NoteElement;
