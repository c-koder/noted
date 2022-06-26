const Colors = ({ id, colors, selected, setSelected }) => {
  return (
    <div
      className="dropdown-menu colors-dropdown"
      aria-labelledby={id || "colorsDropdown"}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="color-palette">
        {colors.map((color) => {
          return (
            <li
              key={color.id}
              data-tip={color.name}
              className={selected.hex === color.hex ? "color-active" : ""}
              style={{
                backgroundColor: color.hex,
                border:
                  color.hex === "transparent" && "2px solid var(--dark-accent)",
              }}
              onClick={() => setSelected(color)}
            >
              {color.hex === "transparent" && (
                <i className="fa fa-eye-slash" style={{ marginLeft: 5 }}></i>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Colors;
