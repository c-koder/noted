import TakeNote from "../components/takeNote.component";

const Reminders = () => {
  return (
    <div>
      <TakeNote />
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
            className="fa fa-bell"
            style={{
              fontSize: 54,
              marginBottom: 20,
              color: "var(--dark-accent)",
            }}
          ></i>
          <br />
          <h1 className="main-h">Upcoming reminders appear here</h1>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
