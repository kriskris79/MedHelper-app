import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../components/Firebase';

function MedicationForm({ onCancel, onAddMedication }) {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [times, setTimes] = useState(['']); // Initialize with one empty string for one time input

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newMedication = { name, dosage, frequency, times: times.filter(time => time) }; // Filter out any empty strings
        try {
            await addDoc(collection(db, "medications"), newMedication);
            // Reset form fields and close form
            setName('');
            setDosage('');
            setFrequency('');
            setTimes(['']); // Reset to initial state with one empty string
            onAddMedication(); // Refresh the medication list
            onCancel(); // Close the form
        } catch (error) {
            console.error("Error adding medication to Firestore: ", error);
        }
    };

    // Function to add a new time input
    const handleAddTime = () => {
        setTimes([...times, '']);
    };

    // Function to handle changing of any time input
    const handleTimeChange = (index, event) => {
        const newTimes = [...times];
        newTimes[index] = event.target.value;
        setTimes(newTimes);
    };

    // Function to remove a specific time input
    const handleRemoveTime = (index) => {
        const newTimes = times.filter((_, i) => i !== index);
        setTimes(newTimes);
    };

    return (
        <form onSubmit={handleSubmit} className="add-medication-form">
            <div>
                <label htmlFor="name">Medication Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                />
            </div>

            <div>
                <label htmlFor="dosage">Dosage:</label>
                <input
                    type="text"
                    id="dosage"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    autoComplete="off"
                />
            </div>

            <div>
                <label htmlFor="frequency">Frequency:</label>
                <input
                    type="text"
                    id="frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    autoComplete="off"
                />
            </div>

            {times.map((time, index) => (
                <div key={index}>
                    <label htmlFor={`time-${index}`}>Time {index + 1}:</label>
                    <input
                        type="time"
                        id={`time-${index}`}
                        value={time}
                        onChange={(e) => handleTimeChange(index, e)}
                        autoComplete="off"
                    />
                    {times.length > 1 && (
                        <button type="button" onClick={() => handleRemoveTime(index)}>Remove</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={handleAddTime}>Add Time</button>

            <div className="button-group">
                <button type="submit">Save Medication</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default MedicationForm;




