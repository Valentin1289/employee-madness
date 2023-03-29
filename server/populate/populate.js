/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const brandsArr = require("./brands.json");
const BrandsModel = require("../db/brand.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateBrands = async () => {
  await BrandsModel.deleteMany({});
  const brands = brandsArr.map((brand) => ({
    name: brand,
  }));
  await BrandsModel.create(...brands);
};

const populateEmployees = async () => {
  const brandsIDs = (await BrandsModel.find({})).map((brand) => brand._id);
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    FavoriteBrand: pick(brandsIDs),
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateBrands();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
