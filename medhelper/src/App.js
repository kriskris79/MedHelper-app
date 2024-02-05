//firebase
import React, { useState } from 'react';
import '../src/scss/styles/_app.scss';
import "../src/scss/generic/_main.scss";
import MedicationList from '../src/components/MedicationList';
import MedicationForm from "../src/components/MedicationForm";

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);

  return (
      <div className="app">
        <h1 className="title">My Medications List</h1>
        <MedicationList />
        <div className="button-container">
          {!showForm && <button onClick={handleShowForm}>Add Medication Reminder</button>}
        </div>
        {showForm && <MedicationForm onCancel={handleHideForm} />}
      </div>
  );
}

export default App;
