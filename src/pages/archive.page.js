import { useEffect, useState } from "react";
import Note from "../components/note.component";

const Archive = ({ pad }) => {
  const CommonRepository = require("../repositories/common.repository");

  const [archiveNotes, setArchiveNotes] = useState([]);

  const addNote = (note, path) => {
    CommonRepository.addNote(pad, note, path).then(
      (response) => response.msg === "success" && deleteNote(note)
    );
  };

  const deleteNote = (note) => {
    CommonRepository.deleteNote(pad, note.id, "archive").then((response) => {
      response === "success" &&
        setArchiveNotes(archiveNotes.filter((item) => item.id !== note.id));
    });
  };

  useEffect(() => {
    CommonRepository.getNotes(pad, "archive")
      .then((response) => {
        setArchiveNotes(response);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {archiveNotes.length > 0 ? (
        <div className="notes-wrapper">
          <div className="notes-list">
            {archiveNotes.map((note) => {
              return (
                <Note
                  key={note.id}
                  note={note}
                  isArchive={true}
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
              className="fa fa-archive"
              style={{
                fontSize: 54,
                marginBottom: 20,
                color: "var(--dark-accent)",
              }}
            ></i>
            <br />
            <h1 className="main-h">Archived notes appear here</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Archive;
