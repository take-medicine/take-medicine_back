import express from "express";
import bodyParser from "body-parser";
import ReminderRoutes from "./routes/ReminderRoutes.js";

const app = express();
app.use(bodyParser.json());

// Rutas
app.use("/reminders", ReminderRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
