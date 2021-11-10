import { toInteger } from "lodash";
import moment from "moment";
import { DATE_FORMAT } from "../../assets/consts";
import "./NoteElement.scss";

interface INoteElement {
  title: string;
  text: string;
  date: string;
}

const NoteElement = ({ title, text, date }: INoteElement) => {
  return (
    <div className="note-element">
      <div className="note-element__top">
        <p className="note-element__title">{title}</p>
        <p className="note-element__date">
          {moment(toInteger(date)).format(DATE_FORMAT)}
        </p>
      </div>
      <div className="note-element__text">{text}</div>
    </div>
  );
};

export default NoteElement;
