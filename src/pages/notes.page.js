import { useEffect, useState } from "react";

import Note from "../components/note.component";
import TakeNote from "../components/takeNote.component";

const Notes = ({ moveToTrash, addToArchive }) => {
  const NotesRepository = require("../repositories/notes.repository");
  const CommonRepository = require("../repositories/common.repository");

  const [savedNotes, setSavedNotes] = useState([]);

  const addNote = (note) => {
    CommonRepository.addNote(1, note, "notes").then(
      (response) =>
        response.msg === "success" &&
        setSavedNotes([response.note, ...savedNotes])
    );
  };

  const updateNote = (note) => {
    NotesRepository.updateNote(1, note).then(
      (response) =>
        response.msg === "success" &&
        setSavedNotes(
          savedNotes.map((item) =>
            item.id === response.note.id ? response.note : item
          )
        )
    );
  };

  const deleteNote = (note) => {
    CommonRepository.addNote(1, note, "trash");
    CommonRepository.deleteNote(1, note.id, "notes").then((response) => {
      response === "success" &&
        setSavedNotes(savedNotes.filter((item) => item.id !== note.id));
    });
  };

  useEffect(() => {
    CommonRepository.getNotes(1, "notes")
      .then((response) => {
        setSavedNotes(response);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   onChildAdded(
  //     query(ref(db, `data_store/${1}/notes`), limitToLast(1)),
  //     (snapshot) => {
  //       savedNotes.findIndex((note) => note.id == snapshot.val().id) === -1 &&
  //         setSavedNotes([snapshot.val(), ...savedNotes]);
  //     }
  //   );
  // }, [savedNotes]);

  // useEffect(() => {
  //   onChildChanged(
  //     query(ref(db, `data_store/${1}/notes`), limitToLast(1)),
  //     (snapshot) => {
  //       setSavedNotes(
  //         savedNotes.map((item) =>
  //           item.id === snapshot.val().id ? snapshot.val() : item
  //         )
  //       );
  //     }
  //   );
  // }, [savedNotes]);

  return (
    <div>
      <TakeNote addNote={addNote} />
      {savedNotes.length > 0 ? (
        <div className="notes-wrapper">
          <div className="notes-list">
            {savedNotes.map((note) => {
              return (
                <Note
                  key={note.id}
                  note={note}
                  addToArchive={addToArchive}
                  updateNote={updateNote}
                  deleteNote={deleteNote}
                  moveToTrash={moveToTrash}
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
              className="fa fa-sticky-note"
              style={{
                fontSize: 54,
                marginBottom: 20,
                color: "var(--dark-accent)",
              }}
            ></i>
            <br />
            <h1 className="main-h">Saved notes appear here</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
