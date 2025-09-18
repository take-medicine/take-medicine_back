import { Sequelize } from "sequelize";

// Configuración directa por ahora para que funcione
const sequelize = new Sequelize('medicine_db', 'medicine_user', 'medicine_pass_2025', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
  logging: console.log, // Para ver las consultas SQL
  define: {
    timestamps: true,
    underscored: true
  }
});

export default sequelize;