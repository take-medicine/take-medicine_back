import { DataTypes } from 'sequelize';
import db_connection from '../database/db_connection.js';
import User from './UserModels.js';

const Reminder = db_connection.define('Reminder', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
});


User.hasMany(Reminder, { foreignKey: 'userId' });
Reminder.belongsTo(User, { foreignKey: 'userId' });

export default Reminder;
