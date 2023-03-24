import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable";
import { useAtom } from "jotai";
import state from "./Atom";

const fetchEquipments = () => {
  return fetch("/api/equipments").then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);
  const [typeOptions, setTypeOptions] = useAtom(state.typeOptions);
  const [typeSelected, setTypeSelected] = useAtom(state.typeSelected);
  const [amountSelected, setAmountlSelected] = useAtom(
    state.amountSelected
  );
  const [amountOptions, setAmountOptions] = useAtom(state.amountOptions);
  const [orderedList, setOrderedList] = useAtom(state.orderedList);
  const handleDelete = (id) => {
    deleteEquipment(id);

    setEquipments((equipments) => {
      return equipments.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    fetchEquipments().then((equipments) => {
      let typesColection = equipments.reduce((arr, equipment) => {
        if (!arr.includes(equipment.type)) {
          arr.push(equipment.type);
        }
        return arr;
      }, []);
      let amountsColection = equipments.reduce((arr, equipment) => {
        if (!arr.includes(equipment.amount)) {
          arr.push(equipment.amount);
        }
        return arr;
      }, []);
      setLoading(false);
      setEquipments(equipments);
      setOrderedList(equipments);
      setTypeOptions(typesColection);
      setAmountOptions(amountsColection);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleFilter = () => {
    let clone =
      typeSelected.length === 0
        ? orderedList
        : orderedList.filter((equipment) =>
            typeSelected.includes(equipment.type)
          );
    return amountSelected.length === 0
      ? clone
      : clone.filter((equipment) =>
          amountSelected.includes(equipment.amount)
        );
  };

  return (
    <>
      <EquipmentTable equipments={equipments} onDelete={handleDelete} />;
    </>
  );
};

export default EquipmentList;
