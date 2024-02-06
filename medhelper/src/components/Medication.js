import React from 'react';

function Medication({ medication, toggleTaken, onDelete }) {
    // Destructure medication properties and ensure 'taken' defaults to false if undefined
    const { id, name, dosage, frequency, times, taken = false } = medication;
    let displayFrequency = frequency;

    if (frequency === 'x-times-a-day') {
        displayFrequency = `${times.length} times a day`;
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this medication?')) {
            onDelete(id);
        }
    };

    return (
        <li className={`medication ${taken ? 'taken' : ''}`}>
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
            <div className="taken">
                <input
                    type="checkbox"
                    checked={taken} // Ensure 'taken' is always boolean
                    onChange={() => toggleTaken(id)}
                />
            </div>
            <div className="delete"> {/* New Column */}
                <button onClick={handleDelete}>Delete</button>
            </div>
        </li>
    );
}

export default Medication;


