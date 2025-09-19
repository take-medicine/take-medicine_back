// src/models/MedicineModel.js
import { DataTypes } from "sequelize";
import db_connection from "../database/db_connection.js";

const MedicineModel = db_connection.define("Medicine", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  frequency_hours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  scheduled_times: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "medicines",
  underscored: true,
  timestamps: true,
});

export default MedicineModel;
