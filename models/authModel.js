const { DataTypes } = require("sequelize");
const db = require("./db");

const validate = require("validator");
const auth = db.define("user", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validator: validate.email,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    enum: ["male", "female"],
  },
  roles: {
    type: DataTypes.STRING,
    enum: ["admin", "buyer", "seller"],
    allowNull: false,
  },
  address1: {
    type: DataTypes.STRING,
  },
  address2: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  pincode: {
    type: DataTypes.INTEGER,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // createdAt: {
  //   type: "TIMESTAMP",
  //   defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  //   allowNull: false,
  // },
  // updatedAt: {
  //   type: "TIMESTAMP",
  //   defaultValue: Sequelize.literal(
  //     "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  //   ),
  //   allowNull: false,
  // },
});

module.exports = auth;
