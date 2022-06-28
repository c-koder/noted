import { useEffect, useState } from "react";

import Note from "../components/note.component";
import TakeNote from "../components/takeNote.component";

const Notes = ({ isReminder, pad }) => {
  const NotesRepository = require("../repositories/notes.repository");
  const CommonRepository = require("../repositories/common.repository");

  const [notes, setNotes] = useState([]);

  const addNote = (note, path) => {
    CommonRepository.addNote(pad, note, path).then(
      (response) =>
        response.msg === "success" &&
        path === (isReminder ? "reminders" : "notes") &&
        setNotes([response.note, ...notes])
    );
  };

  const updateNote = (note) => {
    NotesRepository.updateNote(pad, note).then(
      (response) =>
        response.msg === "success" &&
        setNotes(
          notes.map((item) =>
            item.id === response.note.id ? response.note : item
          )
        )
    );
  };

  const deleteNote = (note) => {
    CommonRepository.addNote(pad, note, "trash");
    CommonRepository.deleteNote(
      pad,
      note.id,
      isReminder ? "reminders" : "notes"
    ).then((response) => {
      response === "success" &&
        setNotes(notes.filter((item) => item.id !== note.id));
    });
  };

  const archiveNote = (note) => {
    CommonRepository.addNote(pad, note, "archive");
    CommonRepository.deleteNote(
      pad,
      note.id,
      isReminder ? "reminders" : "notes"
    ).then((response) => {
      response === "success" &&
        setNotes(notes.filter((item) => item.id !== note.id));
    });
  };

  useEffect(() => {
    CommonRepository.getNotes(pad, isReminder ? "reminders" : "notes")
      .then((response) => {
        setNotes(response);
      })
      .catch((err) => setNotes([]));
    // eslint-disable-next-line
  }, [isReminder]);

  return (
    <div>
      <TakeNote addNote={addNote} isReminder={isReminder} />
      {notes.length > 0 ? (
        <div className="notes-wrapper">
          <div className="notes-list">
            {notes.map((note) => {
              return (
                <Note
                  key={note.id}
                  note={note}
                  updateNote={updateNote}
                  deleteNote={deleteNote}
                  archiveNote={archiveNote}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <i
              className={isReminder ? "fa fa-bell" : "fa fa-sticky-note"}
              style={{
                fontSize: 54,
                marginBottom: 20,
                color: "var(--dark-accent)",
              }}
            ></i>
            <br />
            <h1 className="main-h">
              {isReminder
                ? "Notes with upcoming reminders appear here"
                : "Saved notes appear here"}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
