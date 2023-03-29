import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useRef } from "react";
let selectedId = {};
const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [equipments, setEquipments] = useState([]);
  const [brands, setBrands] = useState([]);
  const levelInput = useRef(null);

  useEffect(() => {
    fetch("/api/equipments/")
      .then((res) => res.json())
      .then((data) => setEquipments(data));
  }, []);

  useEffect(() => {
    fetch("/api/brands/")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
      });
  }, []);

  const addEquipment = (id, key) => {
    selectedId[key] = id;
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

  const handleSetLevel = (e) => {
    let val = e.target.value;
    !isNaN(e.target.value) &&
      (() => {
        val *= 1;
        levelInput.current.value =
          val < 101
            ? "Junior"
            : val < 301
            ? "Medior"
            : val < 401
            ? "Senior"
            : val < 801
            ? "Expert"
            : "Godlike";
      })();
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
          ref={levelInput}
          readOnly
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
      <div className="control">
        <label htmlFor="salary">Salary:</label>
        <input
          defaultValue={employee ? employee.salary || "Unspecified" : null}
          name="salary"
          id="salary"
          onChange={handleSetLevel}
        />
      </div>

      {
        <>
          <NavDropdown
            title="Choose an equipment"
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
                      addEquipment(el._id, "equipment");
                    }}
                  >
                    {el.name}
                  </button>
                </NavDropdown.Item>
              ))}
          </NavDropdown>
          <NavDropdown
            title="Choose a brand"
            id="basic-nav-dropdown"
            style={{ width: "17vw", marginLeft: "1vw" }}
          >
            {brands &&
              brands.map((el, i) => (
                <NavDropdown.Item
                  key={i}
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                >
                  <button
                    onClick={() => {
                      addEquipment(el._id, "FavoriteBrand");
                    }}
                  >
                    {el.name}
                  </button>
                </NavDropdown.Item>
              ))}
          </NavDropdown>
        </>
      }

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
