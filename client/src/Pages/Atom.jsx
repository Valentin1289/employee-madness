import { atom } from "jotai";
const state = {
  levelOptions: atom([]),
  levelSelected: atom([]),
  positionOptions: atom([]),
  positionSelected: atom([]),
  typeOptions: atom([]),
  typeSelected: atom([]),
  amountOptions: atom([]),
  amountSelected: atom([]),
  orderedList: atom([]),
  presence:atom([])
};
export default state