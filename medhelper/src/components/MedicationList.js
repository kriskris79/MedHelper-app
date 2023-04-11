import React from 'react';
import Medication from './Medication';

function MedicationList({ medications, toggleTaken }) {
    return (
        <ul className="medication-list">
            {medications.map(medication => (
                <Medication key={medication.id} medication={medication} toggleTaken={toggleTaken} />
            ))}
        </ul>
    );
}

export default MedicationList;