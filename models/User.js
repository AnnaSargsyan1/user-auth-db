import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
        len: { args: [3, 50], msg: "Name must be 3–50 characters" },
        is: {
          args: /^[a-zA-Z-]+$/i,
          msg: "Name can only contain letters and hyphens",
        },
      },
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Surname cannot be empty" },
        len: { args: [3, 50], msg: "Surname must be 3–50 characters" },
        is: {
          args: /^[a-zA-Z-]+$/i,
          msg: "Surname can only contain letters and hyphens",
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 18,
      validate: {
        min: { args: 12, msg: "Age must be at least 12" },
        max: { args: 110, msg: "Age must be at most 110" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Email already exists" },
      validate: {
        isEmail: { msg: "Invalid email format" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    tableName: "users",
  }
);

export default User;
