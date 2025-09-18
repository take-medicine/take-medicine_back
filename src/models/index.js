import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./database/db_connection.js";

// Importar rutas
import UserRoutes from "./routes/UserRoutes.js";
import ReminderRoutes from "./routes/ReminderRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/users", UserRoutes);
app.use("/api/reminders", ReminderRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend funcionando correctamente!" });
});

// Middleware de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || "Error interno del servidor" 
  });
});

// Conectar a la base de datos y iniciar servidor
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Probar conexión a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');
    
    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados');
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📍 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
  }
}

startServer();

export default app;