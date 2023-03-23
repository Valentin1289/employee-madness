// https://mongoosejs.com/

const { Schema, model } = require("mongoose");

const EquipmentSchema = new Schema({
  name: String,
  type: String,
  amount: Number,
});

module.exports = model("Equipment", EquipmentSchema);
