import moment from "moment";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Colors from "./colors.component";

const Note = ({
  note,
  isArchive,
  isTrash,
  addNote,
  updateNote,
  deleteNote,
  archiveNote,
}) => {
  const [title, setTitle] = useState(note.title);
  const [desc, setDesc] = useState(note.note);

  const colors = [
    { id: 0, hex: "transparent", name: "Default" },
    { id: 1, hex: "#ffa097", name: "Red" },
    { id: 2, hex: "#ffcf43", name: "Orange" },
    { id: 3, hex: "#fff475", name: "Yellow" },
    { id: 4, hex: "#c1ff78", name: "Green" },
    { id: 5, hex: "#a6c8ff", name: "Blue" },
    { id: 6, hex: "#9dc2ff", name: "Dark Blue" },
    { id: 7, hex: "#dbb6fc", name: "Purple" },
    { id: 8, hex: "#f7cd9e", name: "Brown" },
  ];
  const [selectedColor, setSelectedColor] = useState(note.color);

  useEffect(() => {
    if (selectedColor !== note.color) {
      note.color = selectedColor;
      updateNote(note);
    }
    // eslint-disable-next-line
  }, [selectedColor]);

  const [visible, setVisible] = useState(false);

  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openEditNotePopup, setOpenEditNotePopup] = useState(false);

  return (
    <div
      className="note-item"
      style={{ backgroundColor: note.color.hex }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div className="time" style={{ opacity: visible ? 0.7 : 0 }}>
        Modified: {moment(note.lastModified, "DD/MM/YYYY HH:mm").format("lll")}
      </div>
      <div onClick={() => !isArchive && setOpenEditNotePopup(true)}>
        {note.title && <div className="title">{note.title}</div>}
        {note.note && (
          <div className="note" style={{ paddingTop: !note.title && 0 }}>
            {note.note}
          </div>
        )}
        {note.time && (
          <div
            style={{
              marginTop: 10,
              width: "fit-content",
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: "rgba(var(--dark-rgb), 0.1)",
              color: "rgba(var(--dark-rgb), 0.75)",
              padding: "4px 8px",
              borderRadius: 3,
            }}
          >
            <i className="fa fa-clock-o" style={{ marginRight: 5 }}></i>
            {note.time}
          </div>
        )}
        {!note.title && !note.note && (
          <span style={{ color: "var(--dark)", fontSize: 18 }}>Empty Note</span>
        )}
      </div>
      <div
        className="hstack actions"
        style={{
          opacity: visible ? 1 : 0,
          padding: 0,
          marginLeft: -10,
          marginTop: 5,
          marginBottom: -10,
        }}
      >
        {!isArchive && !isTrash && (
          <div className="dropdown">
            <button
              type="button"
              id="colorsDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ all: "unset" }}
            >
              <span data-tip="Background options">
                <i className="fa fa-paint-brush"></i>
              </span>
            </button>
            <Colors
              colors={colors}
              selected={selectedColor}
              setSelected={setSelectedColor}
            />
          </div>
        )}
        {!isArchive && !isTrash ? (
          <button
            type="button"
            style={{ all: "unset" }}
            onClick={() => {
              archiveNote(note);
            }}
          >
            <span data-tip="Archive">
              <i className="fa fa-archive"></i>
            </span>
          </button>
        ) : (
          <button
            type="button"
            style={{ all: "unset" }}
            onClick={() => {
              addNote(
                note,
                note.isNote ? "notes" : note.isReminder && "reminders"
              );
            }}
          >
            <span data-tip="Revert">
              <i className="fa fa-undo"></i>
            </span>
          </button>
        )}
        <button
          type="button"
          style={{ all: "unset" }}
          onClick={() => {
            isTrash || isArchive ? setOpenDeletePopup(true) : deleteNote(note);
          }}
        >
          <span data-tip="Delete" style={{ fontSize: 16 }}>
            <i className="fa fa-trash"></i>
          </span>
        </button>
      </div>
      {(isTrash || isArchive) && (
        <Popup
          open={openDeletePopup}
          modal
          closeOnDocumentClick={false}
          closeOnEscape={false}
        >
          <div className="popup">
            <button
              type="button"
              style={{
                all: "unset",
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "rgba(var(--dark-accent-rgb), 0.25)",
                borderRadius: "0px 5px 0px 0px",
                width: 30,
                height: 30,
                cursor: "pointer",
              }}
              onClick={() => setOpenDeletePopup(false)}
            >
              <i className="fa fa-times"></i>
            </button>
            <p className="main-p">
              Are you sure?
              <br />
              <span style={{ fontSize: 12 }}>
                (This action cannot be reversed)
              </span>
            </p>
            <button
              className="d-flex main-btn ms-auto danger"
              onClick={() => {
                deleteNote(note);
                setOpenDeletePopup(false);
              }}
            >
              Yes
            </button>
          </div>
        </Popup>
      )}
      <Popup
        open={openEditNotePopup}
        modal
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        <div className="popup">
          <button
            type="button"
            style={{
              all: "unset",
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "rgba(var(--dark-accent-rgb), 0.25)",
              borderRadius: "0px 5px 0px 0px",
              width: 30,
              height: 30,
              cursor: "pointer",
            }}
            onClick={() => setOpenEditNotePopup(false)}
          >
            <i className="fa fa-times"></i>
          </button>
          <div
            className="note-group"
            style={{
              boxShadow: "none",
              margin: 0,
              marginBottom: 30,
              padding: 0,
            }}
          >
            <input
              type="text"
              className="note-input"
              style={{ paddingLeft: 0 }}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              type="text"
              className="note-input"
              placeholder="Update your note..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{
                paddingLeft: 0,
                fontSize: 16,
                height: 100,
                maxHeight: 150,
                resize: visible ? "vertical" : "none",
              }}
            />
          </div>
          <button
            className="d-flex main-btn ms-auto success"
            onClick={() => {
              note.title = title;
              note.note = desc;
              updateNote(note);
              setOpenEditNotePopup(false);
            }}
          >
            Save
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default Note;
