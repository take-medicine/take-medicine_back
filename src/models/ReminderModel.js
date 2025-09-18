import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db_connection.js';

class Reminder extends Model {
  static associate(models) {
    // Reminder.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

Reminder.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  medicationName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  taken: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Reminder',
  tableName: 'reminders',
  underscored: true,
  timestamps: true
});

export default Reminder;