import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable";
import { useAtom } from "jotai";
import state from "./Atom";

const fetchEmployees = () => {
  return fetch("/api/equipments").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [levelOptions, setLevelOptions] = useAtom(state.levelOptions);
  const [levelSelected, setLevelSelected] = useAtom(state.levelSelected);
  const [positionSelected, setPositionlSelected] = useAtom(
    state.positionSelected
  );
  const [positionOptions, setPositionOptions] = useAtom(state.positionOptions);
  const [orderedList, setOrderedList] = useAtom(state.orderedList);
  console.log(orderedList);
  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      let levelsColection = employees.reduce((arr, employee) => {
        if (!arr.includes(employee.level)) {
          arr.push(employee.level);
        }
        return arr;
      }, []);
      let positionsColection = employees.reduce((arr, employee) => {
        if (!arr.includes(employee.position)) {
          arr.push(employee.position);
        }
        return arr;
      }, []);
      setLoading(false);
      setEmployees(employees);
      setOrderedList(employees);
      setLevelOptions(levelsColection);
      setPositionOptions(positionsColection);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleFilter = () => {
    let clone =
      levelSelected.length === 0
        ? orderedList
        : orderedList.filter((employee) =>
            levelSelected.includes(employee.level)
          );
    return positionSelected.length === 0
      ? clone
      : clone.filter((employee) =>
          positionSelected.includes(employee.position)
        );
  };

  return (
    <>
      <EquipmentTable employees={handleFilter()} onDelete={handleDelete} />;
    </>
  );
};

export default EquipmentList;
