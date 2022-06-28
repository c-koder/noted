import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";

import logo from "../assets/logo.png";
import RecentPad from "../components/recentPad.component";

const OpenPad = ({ openPad, recentPads }) => {
  const PadRepository = require("../repositories/pad.repository");

  const [number, setNumber] = useState("");

  const [newNumber, setNewNumber] = useState(undefined);
  const [newPad, setNewPad] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [errorType, setErrorType] = useState("W");

  useEffect(() => {
    ReactTooltip.rebuild();
    newPad && setLoading(true);
    newPad && generateNumber();
  }, [newPad]);

  useEffect(() => {
    newNumber &&
      PadRepository.padExists(newNumber).then((response) => {
        if (response) {
          generateNumber();
        } else {
          setLoading(false);
        }
      });
    // eslint-disable-next-line
  }, [newNumber]);

  const generateNumber = () => {
    setNewNumber(Math.floor(100000 + Math.random() * 900000));
  };

  const handlePair = (e) => {
    e.preventDefault();
    if (number === "") {
      setErrorType("W");
      setError("Pad number is required");
    } else if (number.length < 6) {
      setErrorType("W");
      setError("A pad number consists of 6 numbers");
    } else {
      setLoading(true);
      PadRepository.padExists(number).then((response) => {
        if (response) {
          setErrorType("S");
          setError("Accessing your pad now!");
          setTimeout(() => {
            openPad(parseInt(number, 10), false);
          }, 1500);
        } else {
          setErrorType("D");
          setError("Pad not found");
        }
        setLoading(false);
      });
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center container">
      <ReactTooltip
        effect="solid"
        place="bottom"
        className="tooltip"
        arrowColor="transparent"
        delayShow={200}
      />
      <div className="pad-wrapper">
        <div className="pad-cont">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">{newPad ? "Create a Pad" : "Open a Pad"}</h1>
          <hr />
          {newPad ? (
            loading ? (
              <svg className="loader" viewBox="0 0 24 24">
                <circle className="loader__value" cx="12" cy="12" r="10" />
                <circle className="loader__value" cx="12" cy="12" r="10" />
                <circle className="loader__value" cx="12" cy="12" r="10" />
                <circle className="loader__value" cx="12" cy="12" r="10" />
                <circle className="loader__value" cx="12" cy="12" r="10" />
                <circle className="loader__value" cx="12" cy="12" r="10" />
              </svg>
            ) : (
              <div>
                <p className="main-p" style={{ color: "var(--dark-accent)" }}>
                  A new pad was created
                </p>
                <div
                  className="pad-no"
                  data-tip={copied ? "Copied!" : "Click to Copy"}
                  onClick={() => {
                    navigator.clipboard.writeText(newNumber);
                    setCopied(true);
                  }}
                >
                  {newNumber}
                  <i
                    className="fa fa-check-circle"
                    style={{ opacity: copied ? 1 : 0, marginLeft: 8 }}
                  ></i>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      color: "var(--dark-accent)",
                      textAlign: "center",
                      fontWeight: 500,
                      width: "75%",
                    }}
                  >
                    You might want to save it in case the browser cache was
                    cleared.
                  </p>
                </div>
              </div>
            )
          ) : (
            <input
              type="text"
              className="input"
              placeholder="Pad No."
              value={number}
              onChange={(e) => {
                setError(undefined);
                setNumber(e.target.value.replace(/[^0-9+ ]/gi, ""));
              }}
            />
          )}
          <br />
          {newPad ? (
            <div>
              <button
                className="main-btn"
                style={{ backgroundColor: "var(--dark-accent)" }}
                onClick={() => setNewPad(false)}
              >
                <i className="fa fa-chevron-left"></i>
                Back
              </button>
              <button
                className="main-btn success"
                style={{ marginLeft: 20 }}
                onClick={() => openPad(newNumber, true)}
              >
                <i className="fa fa-folder-open"></i>
                Open
              </button>
            </div>
          ) : (
            <div>
              <button
                className="main-btn"
                style={{ backgroundColor: "var(--dark-accent)" }}
                onClick={() => setNewPad(true)}
              >
                <i className="fa fa-plus"></i>
                New Pad
              </button>
              <button
                className="main-btn success"
                style={{ marginLeft: 20 }}
                onClick={handlePair}
                disabled={loading}
              >
                <i className="fa fa-folder-open"></i>
                {loading ? "Opening" : "Open"}
              </button>
              <br />
              {recentPads.length > 0 && (
                <div>
                  <div
                    style={{
                      marginTop: 20,
                      fontWeight: 500,
                      fontSize: 14,
                      color: "var(--dark-accent)",
                    }}
                  >
                    Your Recent Pads
                  </div>
                  <div className="recent-pads">
                    {recentPads.map((pad) => {
                      return (
                        <RecentPad
                          key={pad.number}
                          pad={pad}
                          openPad={openPad}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              <br />
              {error && (
                <div
                  className="error"
                  style={{
                    backgroundColor: `rgba(var(--${
                      errorType === "W"
                        ? "warning"
                        : errorType === "D"
                        ? "danger"
                        : errorType === "S" && "primary"
                    }-rgb), 0.4)`,
                    border: `1px solid rgba(var(--${
                      errorType === "W"
                        ? "warning"
                        : errorType === "D"
                        ? "danger"
                        : errorType === "S" && "primary"
                    }-rgb), 0.7)`,
                    color: "var(--dark)",
                    marginTop: 20,
                  }}
                >
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenPad;
