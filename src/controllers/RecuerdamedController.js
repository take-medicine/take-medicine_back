import RecuerdaMedModel from "../models/RecuerdaMedModel.js";

// GET - Trae todos los recordatorios
export const getAllRecuerdaMed = async (req, res) => {
  try {
    const recordatorios = await RecuerdaMedModel.findAll();
    res.status(200).json(recordatorios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los recordatorios" });
  }
};

// GET - Trae un recordatorio por ID
export const getOneRecuerdaMed = async (req, res) => {
  try {
    const { id } = req.params;
    const recordatorio = await RecuerdaMedModel.findByPk(id);

    if (!recordatorio) {
      return res.status(404).json({ message: "Recordatorio no encontrado" });
    }

    res.status(200).json(recordatorio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT - Actualiza un recordatorio
export const updateRecuerdaMed = async (req, res) => {
  try {
    const { id } = req.params;
    const recordatorio = await RecuerdaMedModel.findByPk(id);

    if (!recordatorio) {
      return res.status(404).json({ message: "Recordatorio no encontrado" });
    }

    await recordatorio.update(req.body);
    res.status(200).json(recordatorio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - Crea un nuevo recordatorio
export const createRecuerdaMed = async (req, res) => {
  try {
    const recordatorio = await RecuerdaMedModel.create(req.body);
    res.status(201).json(recordatorio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Elimina un recordatorio
export const deleteRecuerdaMed = async (req, res) => {
  try {
    const { id } = req.params;
    const recordatorio = await RecuerdaMedModel.findByPk(id);

    if (!recordatorio) {
      return res.status(404).json({ message: "Recordatorio no encontrado" });
    }

    await recordatorio.destroy();
    res.status(200).json({ message: "Recordatorio eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
