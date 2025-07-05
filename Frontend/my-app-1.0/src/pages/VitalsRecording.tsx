import React from 'react';
import { useParams } from 'react-router-dom';

const VitalsRecording: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vitals Recording</h1>
      <p>Recording vitals for patient ID: {id}</p>
      {/* Add vitals recording form or components here */}
    </div>
  );
};

export default VitalsRecording;
