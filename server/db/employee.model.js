// https://mongoosejs.com/

const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  equipment: { type: Schema.Types.ObjectId, ref: "Equipment" },
  FavoriteBrand:{ type: Schema.Types.ObjectId, ref: "Brand" },
});

module.exports = model("Employee", EmployeeSchema);
