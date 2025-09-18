import db_connection from '../take-medicine_back/src/database/db_connection.js';
import User from './models/User.js';
import Reminder from './models/Reminder.js';

const initDB = async () => {
  try {
    await db_connection.sync({ force: false }); // false = solo crea si no existe
    console.log('✅ Base de datos y tablas creadas');
  } catch (error) {
    console.error('❌ Error al crear base de datos/tablas:', error);
  }
};

initDB();
