import React from 'react';

function Medication({ medication, toggleTaken }) {
    const { id, name, dosage, frequency, taken } = medication;

    return (
        <li className={`medication ${taken ? 'taken' : ''}`} onClick={() => toggleTaken(id)}>
            <h2 className="name">{name}</h2>
            <p className="dosage">{dosage}</p>
            <p className="frequency">{frequency}</p>
        </li>
    );
}

export default Medication;