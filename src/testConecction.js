import db_connection from './database/db_connection.js';

const testConnection = async () => {
  try {
    await db_connection.authenticate();
    console.log('✅ Conexión a MySQL exitosa');
  } catch (error) {
    console.error('❌ Error al conectar a MySQL:', error);
  }
};

testConnection();
