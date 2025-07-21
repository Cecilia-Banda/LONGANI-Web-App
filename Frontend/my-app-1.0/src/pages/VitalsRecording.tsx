import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import api from "../Utils/axios.js"; // Adjusted path to utils folder one level up

interface VitalsFormState {
  temperature: number | '';
  bloodPressureSystolic: number | '';
  bloodPressureDiastolic: number | '';
  pulseRate: number | '';
  respiratoryRate: number | '';
  weight: number | '';
  height: number | '';
  spo2: number | '';
  bloodGlucose: number | '';
  painLevel: number | ''; // Scale of 0-10
  notes: string;
}

const VitalsRecording: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Patient ID from the URL
  const navigate = useNavigate(); // For redirecting after submission

  const [vitals, setVitals] = useState<VitalsFormState>({
    temperature: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    pulseRate: '',
    respiratoryRate: '',
    weight: '',
    height: '',
    spo2: '',
    bloodGlucose: '',
    painLevel: '',
    notes: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVitals((prevVitals) => ({
      ...prevVitals,
      [name]: name === 'notes' ? value : (value === '' ? '' : Number(value)), // Convert to number for numerical inputs
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Basic validation (can be expanded)
    if (!id) {
      setError('Patient ID is missing.');
      setLoading(false);
      return;
    }
    if (vitals.temperature === '' || vitals.bloodPressureSystolic === '' || vitals.bloodPressureDiastolic === '') {
        setError('Please fill in at least Temperature and Blood Pressure.');
        setLoading(false);
        return;
    }

    try {
      // Send data to the backend
      // Adjust the endpoint to match your backend's API for recording vitals for a specific patient
      // Example: POST /api/patients/:id/vitals
      const response = await api.post(`/api/patients/${id}/vitals`, {
        patient: id, // Ensure your backend knows which patient these vitals belong to
        ...vitals, // Spread all vitals data
        recordedAt: new Date(), // Add a timestamp
      });

      setSuccess('Vitals recorded successfully!');
      setVitals({ // Optionally reset form or navigate
        temperature: '',
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        pulseRate: '',
        respiratoryRate: '',
        weight: '',
        height: '',
        spo2: '',
        bloodGlucose: '',
        painLevel: '',
        notes: '',
      });
      // Optionally navigate back to patient detail page after a short delay
      setTimeout(() => {
        navigate(`/patients/${id}`);
      }, 2000);

    } catch (err: any) {
      console.error('Failed to record vitals:', err);
      setError(err.response?.data?.message || 'Failed to record vitals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-2xl mx-auto my-8">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Record Patient Vitals</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Recording vitals for Patient ID: <span className="font-semibold text-blue-600">{id}</span>
      </p>

      {loading && <p className="text-blue-500 text-center mb-4">Recording vitals...</p>}
      {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4 font-medium">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature */}
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">
            Temperature (°C)
          </label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            step="0.1" // Allows decimal inputs
            value={vitals.temperature}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., 36.5"
            required
          />
        </div>

        {/* Blood Pressure */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="bloodPressureSystolic" className="block text-sm font-medium text-gray-700 mb-1">
              BP Systolic (mmHg)
            </label>
            <input
              type="number"
              id="bloodPressureSystolic"
              name="bloodPressureSystolic"
              value={vitals.bloodPressureSystolic}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., 120"
              required
            />
          </div>
          <div>
            <label htmlFor="bloodPressureDiastolic" className="block text-sm font-medium text-gray-700 mb-1">
              BP Diastolic (mmHg)
            </label>
            <input
              type="number"
              id="bloodPressureDiastolic"
              name="bloodPressureDiastolic"
              value={vitals.bloodPressureDiastolic}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., 80"
              required
            />
          </div>
        </div>

        {/* Pulse Rate */}
        <div>
          <label htmlFor="pulseRate" className="block text-sm font-medium text-gray-700 mb-1">
            Pulse Rate (bpm)
          </label>
          <input
            type="number"
            id="pulseRate"
            name="pulseRate"
            value={vitals.pulseRate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., 72"
          />
        </div>

        {/* Respiratory Rate */}
        <div>
          <label htmlFor="respiratoryRate" className="block text-sm font-medium text-gray-700 mb-1">
            Respiratory Rate (breaths/min)
          </label>
          <input
            type="number"
            id="respiratoryRate"
            name="respiratoryRate"
            value={vitals.respiratoryRate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., 16"
          />
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            step="0.1"
            value={vitals.weight}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., 70.5"
          />
        </div>

        {/* Height */}
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            step="0.1"
            value={vitals.height}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., 175"
          />
        </div>

        {/* SpO2 */}
        <div>
          <label htmlFor="spo2" className="block text-sm font-medium text-gray-700 mb-1">
            SpO2 (%)
          </label>
          <input
            type="number"
            id="spo2"
            name="spo2"
            min="0"
            max="100"
            value={vitals.spo2}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., 98"
          />
        </div>

        {/* Blood Glucose */}
        <div>
          <label htmlFor="bloodGlucose" className="block text-sm font-medium text-gray-700 mb-1">
            Blood Glucose (mg/dL or mmol/L)
          </label>
          <input
            type="number"
            id="bloodGlucose"
            name="bloodGlucose"
            step="0.1"
            value={vitals.bloodGlucose}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., 90"
          />
        </div>

        {/* Pain Level */}
        <div>
          <label htmlFor="painLevel" className="block text-sm font-medium text-gray-700 mb-1">
            Pain Level (0-10)
          </label>
          <input
            type="number"
            id="painLevel"
            name="painLevel"
            min="0"
            max="10"
            value={vitals.painLevel}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., 5"
          />
        </div>

        {/* Notes */}
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={vitals.notes}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Any additional observations or comments..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-md text-white font-semibold transition duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {loading ? 'Submitting...' : 'Record Vitals'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VitalsRecording;