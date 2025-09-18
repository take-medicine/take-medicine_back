import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";


import ReminderRoutes from "../routes/ReminderRoutes.js";
import UserRoutes from "../routes/userRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.json());

// Rutas
app.use("/reminders", ReminderRoutes);
app.use("/api/users", UserRoutes);

// Middleware de errores simple
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
