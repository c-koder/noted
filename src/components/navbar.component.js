import useWindowDimensions from "../hooks/useWindowDimensions";

const Navbar = ({ view, setView }) => {
  const { width } = useWindowDimensions();

  return (
    <ul className="nav justify-content-center">
      <li className={view === 1 ? "nav-active" : ""} onClick={() => setView(1)}>
        <i className="fa fa-sticky-note"></i>
        {width > 992 && "Notes"}
      </li>
      <li className={view === 2 ? "nav-active" : ""} onClick={() => setView(2)}>
        <i className="fa fa-bell"></i>
        {width > 992 && "Reminders"}
      </li>
      <li className={view === 3 ? "nav-active" : ""} onClick={() => setView(3)}>
        <i className="fa fa-archive"></i>
        {width > 992 && "Archive"}
      </li>
      <li className={view === 4 ? "nav-active" : ""} onClick={() => setView(4)}>
        <i className="fa fa-trash"></i>
        {width > 992 && "Trash"}
      </li>
    </ul>
  );
};

export default Navbar;
