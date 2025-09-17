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

require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Rutas
app.use('/api/users', require('./routes/userRoutes'));

// Middleware de errores simple
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
