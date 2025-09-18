import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";


import ReminderRoutes from "./routes/ReminderRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();


app.use(bodyParser.json());
app.use(express.json());

app.use("/reminders", ReminderRoutes);
app.use("/api/users", UserRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

export default app;
