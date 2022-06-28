import { useEffect, useState } from "react";
import Note from "../components/note.component";

const Trash = ({ pad }) => {
  const CommonRepository = require("../repositories/common.repository");

  const [trashNotes, setTrashNotes] = useState([]);

  const addNote = (note, path) => {
    CommonRepository.addNote(pad, note, path).then(
      (response) => response.msg === "success" && deleteNote(note)
    );
  };

  const deleteNote = (note) => {
    CommonRepository.deleteNote(pad, note.id, "trash").then((response) => {
      response === "success" &&
        setTrashNotes(trashNotes.filter((item) => item.id !== note.id));
    });
  };

  useEffect(() => {
    CommonRepository.getNotes(pad, "trash")
      .then((response) => {
        setTrashNotes(response);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {trashNotes.length > 0 ? (
        <div className="notes-wrapper">
          <div className="notes-list">
            {trashNotes.map((note) => {
              return (
                <Note
                  key={note.id}
                  note={note}
                  isTrash={true}
                  addNote={addNote}
                  deleteNote={deleteNote}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <i
              className="fa fa-trash"
              style={{
                fontSize: 54,
                marginBottom: 20,
                color: "var(--dark-accent)",
              }}
            ></i>
            <br />
            <h1 className="main-h">No notes found in the trash</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trash;
