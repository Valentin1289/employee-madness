import { Outlet, Link } from "react-router-dom";
import { useAtom } from "jotai";
import state from "../Atom";
import { useRef } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

import "./EquipmentLayout.css";

const EquipmentLayout = () => {
  const [levelSelected, setLevelSelected] = useAtom(state.levelSelected);
  const [levelOptions, setLevelOptions] = useAtom(state.levelOptions);
  const [positionSelected, setPositionlSelected] = useAtom(
    state.positionSelected
  );
  const [positionOptions, setPositionOptions] = useAtom(state.positionOptions);
  const [orderedList, setOrderedList] = useAtom(state.orderedList);

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
  // const handlesort = (poz) => {
  //   poz === 0
  //     ? setOrderedList((prev) => {
  //         return [
  //           ...prev.sort((a, b) =>
  //             a.name.split(" ")[0] < b.name.split(" ")[0] ? -1 : 1
  //           ),
  //         ];
  //       })
  //     : poz === 1
  //     ? setOrderedList((prev) => {
  //         return [
  //           ...prev.sort((a, b) =>
  //             a.name.split(" ")[a.name.split(" ").length - 1] <
  //             b.name.split(" ")[b.name.split(" ").length - 1]
  //               ? -1
  //               : 1
  //           ),
  //         ];
  //       })
  //     : poz === 2
  //     ? setOrderedList((prev) => {
  //         return [
  //           ...prev.sort((a, b) =>
  //             a.name.split(" ").length === 3
  //               ? b.name.split(" ").length === 3
  //                 ? a.name.split(" ")[1] < b.name.split(" ")[1]
  //                   ? -1
  //                   : 1
  //                 : -1
  //               : 1
  //           ),
  //         ];
  //       })
  //     : poz === 3
  //     ? setOrderedList((prev) => {
  //         return [...prev.sort((a, b) => (a.level < b.level ? -1 : 1))];
  //       })
  //     : poz === 4
  //     ? setOrderedList((prev) => {
  //         return [...prev.sort((a, b) => (a.position < b.position ? -1 : 1))];
  //       })
  //     : setOrderedList(orderedList);
  // };
  return (
    <div className="EquipmentLayout">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/">Employees</Link>
          </li>
          <li className="grow">
            <Link to="/Equipments">Equipments</Link>
          </li>
          <li className="sort-by">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <NavDropdown
                title="Sort by"
                id="basic-nav-dropdown"
                style={{ width: "17vw", marginLeft: "1vw" }}
              >
                {/* <NavDropdown.Item style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                  <button
                    onClick={() => {
                      handlesort(0);
                    }}
                  >
                    Name
                  </button>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                  <button
                    onClick={() => {
                      handlesort(1);
                    }}
                  >
                    Last name
                  </button>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                  <button
                    onClick={() => {
                      handlesort(2);
                    }}
                  >
                    Middle name
                  </button>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                  <button
                    onClick={() => {
                      handlesort(3);
                    }}
                  >
                    Level
                  </button>
                </NavDropdown.Item>
                <NavDropdown.Item style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                  <button
                    onClick={() => {
                      handlesort(4);
                    }}
                  >
                    Position
                  </button>
                </NavDropdown.Item> */}
              </NavDropdown>
            </div>
          </li>
          <li className="filter">
            <Link to="/"></Link>
            <button
            //   onClick={
            //     () => {
            //     handleShow(lvlOptDiv.current);
            //   }
            // }
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
            // onClick={() => {
            //   handleShow(posOptDiv.current);
            // }}
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
            <Link to="/Equipments/create">
              <button type="button">Create Equipment</button>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default EquipmentLayout;
