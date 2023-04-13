import React, { useState } from 'react';

function MedicationForm({ onSave, onCancel }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('');
    const [timesPerDay, setTimesPerDay] = useState('');
    const [times, setTimes] = useState([]);
    const [time, setTime] = useState('');
    const [dosage, setDosage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({ name, description, frequency, timesPerDay, times, dosage });
        setName('');
        setDescription('');
        setFrequency('');
        setTimesPerDay('');
        setTimes([]);
        setTime('');
        setDosage('');
    };

    const handleAddTime = () => {
        setTimes([...times, time]);
        setTime('');
    };

    const handleRemoveTime = (index) => {
        setTimes([...times.slice(0, index), ...times.slice(index + 1)]);
    };

    return (
        <form className="add-medication-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Medication Name</label>
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
                    {times.map((t, index) => (
                        <div key={index}>
                            <label>Time {index + 1}</label>
                            <input type="time" value={t} readOnly />
                            <button type="button" onClick={() => handleRemoveTime(index)}>Remove</button>
                        </div>
                    ))}
                    {times.length < timesPerDay && (
                        <div>
                            <label>Time {times.length + 1}</label>
                            <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
                            <button type="button" onClick={handleAddTime}>Add Time</button>
                        </div>
                    )}
                </div>
            )}
        </form>
    );
}

export default MedicationForm;