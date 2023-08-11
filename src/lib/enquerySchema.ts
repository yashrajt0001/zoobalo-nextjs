import { DataTypes } from "sequelize";
import { sequelize } from "./db";

export const Enquery = sequelize.define("Enqueries", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.STRING(500),
  },
}, {
  updatedAt: false
});
