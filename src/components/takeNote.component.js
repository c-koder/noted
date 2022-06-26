import { useEffect, useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import Colors from "./colors.component";

const TakeNote = ({ addNote, addToArchive }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const [visible, setVisible] = useState(false);

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
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [visible]);

  return (
    <div>
      <center>
        <div
          ref={ref}
          className="note-group"
          style={{ backgroundColor: selectedColor.hex }}
        >
          <ReactTooltip
            effect="solid"
            place="bottom"
            className="tooltip"
            arrowColor="transparent"
            delayShow={0}
          />
          <input
            type={visible ? "text" : "hidden"}
            className="note-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            className="note-input"
            placeholder="Save a note..."
            onClick={() => setVisible(true)}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              fontSize: visible ? 15 : 16,
              maxHeight: 100,
              resize: visible ? "vertical" : "none",
            }}
          />
          {visible && (
            <div className="hstack actions">
              <div className="dropdown">
                <button
                  type="button"
                  id={note.id}
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
                  id={note.id}
                  colors={colors}
                  selected={selectedColor}
                  setSelected={setSelectedColor}
                />
              </div>
              <button
                type="button"
                style={{ all: "unset" }}
                onClick={() => {
                  setTitle("");
                  setNote("");
                  setSelectedColor(colors[0]);
                  addToArchive({
                    title: title,
                    note: note,
                    color: selectedColor,
                  });
                }}
              >
                <span data-tip="Archive">
                  <i className="fa fa-archive"></i>
                </span>
              </button>
              <button
                className="ms-auto"
                type="button"
                style={{ all: "unset" }}
                onClick={() => {
                  setTitle("");
                  setNote("");
                  setSelectedColor(colors[0]);
                  addNote({
                    title: title,
                    note: note,
                    color: selectedColor,
                  });
                }}
              >
                <span data-tip="Save" style={{ fontSize: 16 }}>
                  <i className="fa fa-floppy-o"></i>
                </span>
              </button>
            </div>
          )}
        </div>
      </center>
    </div>
  );
};

export default TakeNote;
