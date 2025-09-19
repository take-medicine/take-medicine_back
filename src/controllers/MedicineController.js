// src/controllers/MedicineController.js
import MedicineModel from "../models/Medicine.js";

export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await MedicineModel.findAll();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOneMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await MedicineModel.findByPk(id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMedicine = async (req, res) => {
  try {
    const medicine = await MedicineModel.create(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await MedicineModel.findByPk(id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    await medicine.update(req.body);
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await MedicineModel.findByPk(id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    await medicine.destroy();
    res.json({ message: "Medicine deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
