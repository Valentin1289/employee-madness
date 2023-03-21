import { Outlet, Link } from "react-router-dom";
import { useAtom } from "jotai";
import state from "../Atom";
import { useRef } from "react";

import "./Layout.css";

const Layout = () => {
  const [levelSelected, setLevelSelected] = useAtom(state.levelSelected);
  const [levelOptions, setLevelOptions] = useAtom(state.levelOptions);
  const [positionSelected, setPositionlSelected] = useAtom(
    state.positionSelected
  );
  const [positionOptions, setPositionOptions] = useAtom(state.positionOptions);

  const lvlOptDiv = useRef(null);
  const posOptDiv = useRef(null);

  const handleSetFilter = (el, setter) => {
    let arr = [];
    el.current.querySelectorAll("input:checked").forEach((opt) => {
      arr.push(opt.id);
    });
    setter(arr);
  };
  const handleShow = (target) => {
    if (target.style.visibility === "visible") {
      target.style.visibility = "hidden";
    } else {
      target.style.visibility = "visible";
    }
  };
  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/">Employees</Link>
          </li>
          <li className="filter">
            <Link to="/"></Link>
            <button
              onClick={() => {
                handleShow(lvlOptDiv.current);
              }}
            >
              Filter by Level
            </button>
            <div id="level-options" ref={lvlOptDiv}>
              {levelOptions.map((opt, index) => {
                return (
                  <label key={index} htmlFor={`${opt}`} className="checkbox">
                    {opt}
                    <input
                      onChange={() => {
                        handleSetFilter(lvlOptDiv, setLevelSelected);
                      }}
                      type="checkbox"
                      id={`${opt}`}
                    />
                  </label>
                );
              })}
            </div>
          </li>

          <li className="filter">
            <Link to="/"></Link>
            <button
              onClick={() => {
                handleShow(posOptDiv.current);
              }}
            >
              Filter by Position
            </button>
            <div id="position-options" ref={posOptDiv}>
              {positionOptions.map((opt, index) => {
                return (
                  <label key={index} htmlFor={`${opt}`} className="checkbox">
                    {opt}
                    <input
                      onChange={() => {
                        handleSetFilter(posOptDiv, setPositionlSelected);
                      }}
                      type="checkbox"
                      id={`${opt}`}
                    />
                  </label>
                );
              })}
            </div>
          </li>
          <li>
            <Link to="/create">
              <button type="button">Create Employee</button>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
