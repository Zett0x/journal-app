import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

export const JournalEntry = ({ id, date, title, body, imgUrl }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();

  const handleClickNote = () => {
    dispatch(
      activeNote(id, {
        date,
        title,
        body,
        imgUrl,
      })
    );
  };

  return (
    <div
      className="journal__entry animate__animated animate__fadeIn animate__faster"
      onClick={handleClickNote}
    >
      {imgUrl && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${imgUrl})`,
          }}
        ></div>
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};
