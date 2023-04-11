import React, { useState } from 'react';
import './scss/styles/_app.scss';
import "./scss/generic/_main.scss";
import MedicationList from './components/MedicationList';


function App() {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Aspirin', dosage: '81mg', frequency: 'Daily', taken: false },
    { id: 2, name: 'Lipitor', dosage: '20mg', frequency: 'Daily', taken: false },
    { id: 3, name: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', taken: false },
  ]);

  const toggleTaken = (id) => {
    setMedications(medications.map(medication => {
      if (medication.id === id) {
        return { ...medication, taken: !medication.taken };
      } else {
        return medication;
      }
    }));
  };

  return (
      <div className="app">
        <h1 className="title">My Medications</h1>
        <MedicationList medications={medications} toggleTaken={toggleTaken} />
      </div>
  );
}

export default App;