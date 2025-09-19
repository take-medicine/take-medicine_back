import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db_connection.js';

class Medicine extends Model {}

Medicine.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  dosage: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  frequency_hours: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 24
  },
  scheduled_times: {
    type: DataTypes.JSON,
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Medicine',
  tableName: 'medicines',
  underscored: true,
  timestamps: true
});

export default Medicine;