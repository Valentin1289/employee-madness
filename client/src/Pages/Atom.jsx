import { atom } from "jotai";
const state = {
  levelOptions: atom([]),
  levelSelected: atom([]),
  positionOptions: atom([]),
  positionSelected: atom([]),
  orderedList: atom([])
};
export default state