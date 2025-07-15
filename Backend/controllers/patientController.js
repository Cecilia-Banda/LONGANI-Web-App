import Patient from '../models/patientModel.js';

export const createPatient = async (req, res) => {
  try {
    const patient = new Patient({ ...req.body, createdBy: req.user.id });
    await patient.save();
    res.status(201).json({ msg: 'Patient added successfully', patient });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add patient', details: err.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('createdBy', 'username role');
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patients', details: err.message });
  }
};

export const getSinglePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching patient', details: err.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Patient not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update patient', details: err.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Patient not found' });
    res.status(200).json({ msg: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete patient', details: err.message });
  }
};
export default { createPatient, getAllPatients, getSinglePatient, updatePatient, deletePatient };