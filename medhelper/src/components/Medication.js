import React from 'react';

function Medication({ medication, toggleTaken, onDelete }) {
    const { id, name, dosage, frequency, times, taken = false } = medication;

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this medication?')) {
            onDelete(id);
        }
    };

    return (
        <li className={`medication ${taken ? 'taken' : ''}`}>
            <div className="name">{name}</div>
            <div className="dosage">{dosage}</div>
            <div className="frequency">{frequency}</div>
            <div className="times">
                {times && times.map((time, index) => (
                    <span key={index}>{time}</span>
                ))}
            </div>
            <div className="taken">
                <input
                    type="checkbox"
                    id={`taken-${id}`}
                    name={`taken-${id}`}
                    checked={taken}
                    onChange={() => toggleTaken(id)}
                />
                <label htmlFor={`taken-${id}`} className="visually-hidden">Taken</label>
            </div>
            <div className="delete">
                <button onClick={handleDelete}>Delete</button>
            </div>
        </li>
    );
}

export default Medication;



