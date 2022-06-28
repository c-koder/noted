import moment from "moment";
import { useEffect, useRef, useState } from "react";
import ReactTooltip from "react-tooltip";

import Colors from "./colors.component";

const TakeNote = ({ addNote, isReminder }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState(
    moment().endOf("hour").add(1, "minute").format("HH:mm")
  );

  const [isDateInvalid, setDateInvalid] = useState(false);

  useEffect(() => {
    isReminder && setDateInvalid(moment(time, "HH:mm").isBefore(moment()));
    // eslint-disable-next-line
  }, [time]);

  const [isVisible, setVisible] = useState(false);

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
  }, [isVisible]);

  return (
    <div className="d-flex justify-content-center">
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
          type={isVisible ? "text" : "hidden"}
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
            fontSize: isVisible ? 15 : 16,
            maxHeight: 100,
            resize: isVisible ? "vertical" : "none",
          }}
        />
        {isReminder && isVisible && (
          <div
            className="dropdown justify-content-start"
            style={{ padding: "0px 20px 15px" }}
          >
            <button
              type="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ all: "unset", cursor: "pointer" }}
            >
              <span
                style={{
                  width: "100%",
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor: `rgba(var(--${
                    isDateInvalid ? "danger-rgb), 0.4)" : "dark-rgb), 0.1)"
                  }`,
                  color: isDateInvalid ? "var(--dark)" : "var(--dark-accent)",
                  padding: "4px 8px",
                  borderRadius: 3,
                }}
              >
                <i className="fa fa-clock-o" style={{ marginRight: 5 }}></i>
                {moment(date).format(
                  `MMM DD${
                    date.substring(0, 4) > moment().format("YYYY")
                      ? " YYYY"
                      : ""
                  }`
                ) +
                  ", " +
                  moment(time, "HH:mm").format("HH:mm")}
              </span>
            </button>
            <div
              className="dropdown-menu custom-dropdown"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="date"
                className="note-input"
                style={{ width: "100%" }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={date}
              />
              <input
                type="time"
                className="note-input"
                style={{ width: "100%" }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
        )}
        {isVisible && (
          <div className="hstack actions">
            <div className="dropdown">
              <button
                type="button"
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
            <button
              type="button"
              style={{ all: "unset" }}
              onClick={() => {
                if (!isDateInvalid) {
                  addNote(
                    {
                      title: title,
                      note: note,
                      color: selectedColor,
                      ...(isReminder && {
                        time:
                          moment(date, "YYYY-MM-DD").format("DD/MM/YYYY") +
                          " " +
                          time,
                      }),
                      ...(!isReminder
                        ? { isNote: true }
                        : { isReminder: true }),
                    },
                    "archive"
                  );
                  setTitle("");
                  setNote("");
                  setSelectedColor(colors[0]);
                }
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
                if (!isDateInvalid) {
                  addNote(
                    {
                      title: title,
                      note: note,
                      color: selectedColor,
                      ...(isReminder && {
                        time:
                          moment(date, "YYYY-MM-DD").format("DD/MM/YYYY") +
                          " " +
                          time,
                      }),
                      ...(!isReminder
                        ? { isNote: true }
                        : { isReminder: true }),
                    },
                    !isReminder ? "notes" : "reminders"
                  );
                  setTitle("");
                  setNote("");
                  setSelectedColor(colors[0]);
                }
              }}
            >
              <span data-tip="Save" style={{ fontSize: 16 }}>
                <i className="fa fa-floppy-o"></i>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeNote;
