import { Link, useParams } from "react-router-dom";
import "./EmployeeTable.css";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import state from "../../Pages/Atom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
let k = 1;
const EmployeeTable = ({ employees, onDelete }) => {
  const [sortedEmployees, setSortedEmployees] = useState([]);
  const [presence, setPresence] = useAtom(state.presence);
  const [page, setPage] = useState(1);
  const tableEl = useRef(null);
  const [[h, o], setUrl] = useState(["", ""]);
  let { header, order } = useParams();
  useEffect(() => {
    setSortedEmployees(employees);
  }, [employees]);
  console.log("rerendered");

  const handleChange = (e) => {
    let presence = [];
    tableEl.current
      .querySelectorAll("input:checked")
      .forEach((el) => presence.push(el.id));
    console.log(presence);
    setPresence(presence);
  };
  const handleSort = (crit) => {
    setSortedEmployees(
      employees.sort((a, b) =>
        a[crit].toLowerCase() > b[crit].toLowerCase()
          ? order === "asc"
            ? -1
            : 1
          : order === "asc"
          ? 1
          : -1
      )
    );
  };

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th
              className="name-crit"
              onClick={() => {
                handleSort("name");
              }}
            >
              <Link to={`/employees/name/${order === "asc" ? "desc" : "asc"}`}>
                Name
              </Link>
            </th>
            <th
              onClick={() => {
                handleSort("level");
              }}
            >
              <Link to={`/employees/level/${order === "asc" ? "desc" : "asc"}`}>
                Level
              </Link>
            </th>
            <th
              onClick={() => {
                handleSort("position");
              }}
            >
              <Link
                to={`/employees/position/${order === "asc" ? "desc" : "asc"}`}
              >
                Position
              </Link>
            </th>
            <th>Present</th>
            <th>FavoriteBrand</th>
            <th></th>
            <th />
          </tr>
        </thead>
        <tbody ref={tableEl}>
          {[...sortedEmployees.slice((page - 1) * 10, page * 10)].map(
            (employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
                <td>
                  <label htmlFor={`${employee._id}`} className="checkbox">
                    <input
                      className="present"
                      type="checkbox"
                      id={`${employee._id}`}
                      onChange={handleChange}
                      checked={presence.includes(employee._id)}
                    />
                  </label>
                </td>
                <td>
                  {employee.FavoriteBrand
                    ? employee.FavoriteBrand.name
                      ? employee.FavoriteBrand.name
                      : employee.FavoriteBrand
                    : "none"}
                </td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Stack spacing={2}>
        <Pagination
          hideNextButton={true}
          hidePrevButton={true}
          onChange={(e, page) => {
            setPage(page);
          }}
          count={Math.ceil(employees.length / 10)}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default EmployeeTable;
