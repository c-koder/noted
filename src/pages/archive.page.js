import Note from "../components/note.component";

const Archive = ({ archivedNotes, deleteArchiveNote, addNote }) => {
  return (
    <div>
      {archivedNotes.length > 0 ? (
        <div className="notes-list">
          {archivedNotes.map((note) => {
            return (
              <Note
                key={note.id}
                note={note}
                addNote={addNote}
                isArchive={true}
                deleteArchiveNote={deleteArchiveNote}
              />
            );
          })}
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
