'use strict';
import { Model, DataTypes }  from 'sequelize';
import  db_connection  from '../database/db_connection.js';

  class User extends Model {}

  
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize: db_connection,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    timestamps: true
  });


export default User;