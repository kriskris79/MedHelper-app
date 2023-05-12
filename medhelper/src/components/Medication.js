import React from 'react';

function Medication({ medication, toggleTaken }) {
    const { id, name, dosage, frequency, times, taken } = medication;
    let displayFrequency = frequency;

    if (frequency === 'x-times-a-day') {
        displayFrequency = `${times.length} times a day`;
    }

    return (
        <li className={`medication ${taken ? 'taken' : ''}`} onClick={() => toggleTaken(id)}>
            <h2 className="name">{name}</h2>
            <p className="dosage">{dosage}</p>
            <p className="frequency">{displayFrequency}</p>
            {times && times.length > 0 && (
                <div>
                    <p className="times">Times:</p>
                    <ul className="times-list">
                        {times.map((time, index) => (
                            <li key={index}>{time}</li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
}

export default Medication;
