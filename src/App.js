import { useEffect, useState } from "react";

import Navbar from "./components/navbar.component";
import Archive from "./pages/archive.page";
import OpenPad from "./pages/openPad.page";
import Notes from "./pages/notes.page";
import Trash from "./pages/trash.page";

const App = () => {
  const PadRepository = require("./repositories/pad.repository");

  const [view, setView] = useState(1);
  const [pad, setPad] = useState(undefined);
  const [recentPads, setRecentPads] = useState([]);

  const openPad = (number, isNew) => {
    if (isNew) {
      PadRepository.createPad(number).then((response) => {
        if (response === "success") {
          setPad(number);
        }
      });
    } else {
      setPad(number);
    }

    const pads = JSON.parse(localStorage.getItem("pads"));
    if (pads) {
      if (pads.findIndex((pad) => pad.number === number) === -1) {
        const newItems = JSON.stringify([...pads, { number: number }]);
        localStorage.setItem("pads", newItems);
      }
    } else {
      localStorage.setItem("pads", JSON.stringify([{ number: number }]));
    }
  };

  useEffect(() => {
    console.log(recentPads);
  }, [recentPads]);

  useEffect(() => {
    const pads = JSON.parse(localStorage.getItem("pads"));
    if (pads) {
      setRecentPads(pads);
    }
  }, []);

  return pad ? (
    <div>
      <Navbar view={view} setView={setView} />
      {view === 1 ? (
        <Notes isReminder={false} pad={pad} />
      ) : view === 2 ? (
        <Notes isReminder={true} pad={pad} />
      ) : view === 3 ? (
        <Archive pad={pad} />
      ) : view === 4 ? (
        <Trash pad={pad} />
      ) : (
        ""
      )}
    </div>
  ) : (
    <OpenPad openPad={openPad} recentPads={recentPads} />
  );
};

export default App;
