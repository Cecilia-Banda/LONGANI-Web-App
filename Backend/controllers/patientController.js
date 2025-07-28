import Patient from '../models/patientModel.js';

// Search Patients Controller
export const searchPatients = async (req, res) => {
  const query = req.query.q;

  if (!query) return res.status(400).json({ error: 'Search query is required' });

  try {
    const regex = new RegExp(query, 'i'); // case-insensitive match
    const results = await Patient.find({
      $or: [
        { fullName: regex },
        { phone: regex },
        { nationalId: regex },
        { address: regex }
      ]
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
};


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
    res.status(200).json({ msg: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete patient', details: err.message });
  }
};
