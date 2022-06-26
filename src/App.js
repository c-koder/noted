import { useState } from "react";

import Navbar from "./components/navbar.component";
import Archive from "./pages/archive.page";
import Reminders from "./pages/reminders.page";
import Notes from "./pages/notes.page";
import Trash from "./pages/trash.page";

const App = () => {
  const [view, setView] = useState(1);

  return (
    <div>
      <Navbar view={view} setView={setView} />
      {view === 1 ? (
        <Notes />
      ) : view === 2 ? (
        <Reminders />
      ) : view === 3 ? (
        <Archive />
      ) : view === 4 ? (
        <Trash />
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
