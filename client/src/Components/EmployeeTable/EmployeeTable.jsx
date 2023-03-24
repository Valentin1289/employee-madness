import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useRef } from "react";
import { useAtom } from "jotai";
import state from "../../Pages/Atom";

const EmployeeTable = ({ employees, onDelete }) => {
  const [presence, setPresence] = useAtom(state.presence);
  const tableEl = useRef(null);

  const handleChange = (e) => {
    let presence = [];
    tableEl.current
      .querySelectorAll("input:checked")
      .forEach((el) => presence.push(el.id));
    console.log(presence);
    setPresence(presence);
  };

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Present</th>
            <th></th>
            <th />
          </tr>
        </thead>
        <tbody ref={tableEl}>
          {employees.map((employee) => (
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
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
