import React, { useState } from 'react';


function MedicationForm({ onSave, onCancel }) {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({ name, dosage, frequency, time });
        setName('');
        setDosage('');
        setFrequency('');
        setTime('');
    };

    return (
        <form className="add-reminder-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
                <label htmlFor="dosage">Dosage</label>
                <input type="text" id="dosage" value={dosage} onChange={(event) => setDosage(event.target.value)} />
            </div>
            <div>
                <label htmlFor="frequency">Frequency</label>
                <select id="frequency" value={frequency} onChange={(event) => setFrequency(event.target.value)}>
                    <option value="">-- Select Frequency --</option>
                    <option value="Daily">Daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
            </div>
            <div>
                <label htmlFor="time">Time</label>
                <input type="time" id="time" value={time} onChange={(event) => setTime(event.target.value)} />
            </div>
            <div className="button-container">
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default MedicationForm;


