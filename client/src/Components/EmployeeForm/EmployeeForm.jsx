import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
let selectedId = {};
const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [equipments, setEquipments] = useState([]);
  useEffect(() => {
    fetch("/api/equipments")
      .then((res) => res.json())
      .then((data) => setEquipments(data));
  }, []);

  const addEquipment = (id) => {
    selectedId.equipment = id;
    alert("The equipment was seted");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, selectedId);
    console.log(employee);
    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      {employee && (
        <NavDropdown
          title="Sort by"
          id="basic-nav-dropdown"
          style={{ width: "17vw", marginLeft: "1vw" }}
        >
          {equipments &&
            equipments.map((el, i) => (
              <NavDropdown.Item
                key={i}
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
              >
                <button
                  onClick={() => {
                    addEquipment(el._id);
                  }}
                >
                  {el.name}
                </button>
              </NavDropdown.Item>
            ))}
        </NavDropdown>
      )}

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
