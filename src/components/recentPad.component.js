const RecentPad = ({ pad, openPad }) => {
  return (
    <div className="pad" onClick={() => openPad(pad.number, false)}>
      {pad.number}
    </div>
  );
};

export default RecentPad;
