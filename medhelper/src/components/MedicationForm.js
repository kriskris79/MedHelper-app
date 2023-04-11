import React, { useState } from 'react';


function MedicationForm({ onSave, onCancel }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('');
    const [timesPerDay, setTimesPerDay] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({ name, description, frequency, timesPerDay, time });
        setName('');
        setDescription('');
        setFrequency('');
        setTimesPerDay('');
        setTime('');
    };

    return (
        <form className="add-medication-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Medication Name</label>
                <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
                <label htmlFor="description">Dosage/Description</label>
                <input type="text" id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <div>
                <label htmlFor="frequency">Frequency</label>
                <select id="frequency" value={frequency} onChange={(event) => setFrequency(event.target.value)}>
                    <option value="">-- Select Frequency --</option>
                    <option value="daily">Daily</option>
                    <option value="hourly">Every x hours</option>
                    <option value="x-times-a-day">X times a day</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            {frequency === 'hourly' && (
                <div>
                    <label htmlFor="timesPerDay">Every x hours</label>
                    <input type="number" id="timesPerDay" value={timesPerDay} onChange={(event) => setTimesPerDay(event.target.value)} />
                </div>
            )}
            {frequency === 'x-times-a-day' && (
                <div>
                    <label htmlFor="timesPerDay">X times a day</label>
                    <input type="number" id="timesPerDay" value={timesPerDay} onChange={(event) => setTimesPerDay(event.target.value)} />
                </div>
            )}
            {(frequency === 'daily' || frequency === 'hourly' || frequency === 'x-times-a-day') && (
                <div>
                    <label htmlFor="time">Time</label>
                    <input type="time" id="time" value={time} onChange={(event) => setTime(event.target.value)} />
                    {frequency === 'x-times-a-day' && <p className="hint">Enter times in 24-hour format (e.g. 08:00, 13:00, 20:00)</p>}
                </div>
            )}
            <div className="button-group">
                <button type="submit" className="btn-primary">
                    Add Medication
                </button>
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default MedicationForm;