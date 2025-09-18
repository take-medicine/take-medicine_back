import app from "./app.js";
import db_connection from './database/db_connection.js';

const PORT = process.env.PORT || 3000;

(async () => {
  try { 
    await db_connection.authenticate();
    console.log('DB connected');

    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
})();
