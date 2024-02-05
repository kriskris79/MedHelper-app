// // still problems witch auto refreshing
// import React, { useState } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import db from './Firebase'; // Adjust the import path as needed
//
// function MedicationForm({ onMedicationAdded }) {
//     const [name, setName] = useState('');
//     const [dosage, setDosage] = useState('');
//     const [frequency, setFrequency] = useState('');
//     const [times, setTimes] = useState([]);
//
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const newMedication = {
//             name,
//             dosage,
//             frequency,
//             times,
//         };
//
//         try {
//             await addDoc(collection(db, "medications"), newMedication);
//             console.log("New medication added to Firestore.");
//             setName('');
//             setDosage('');
//             setFrequency('');
//             setTimes([]);
//
//             // Call onMedicationAdded to refresh the list in the parent component
//             if (onMedicationAdded) {
//                 onMedicationAdded();
//             }
//         } catch (error) {
//             console.error("Error adding medication to Firestore:", error);
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit} className="add-medication-form">
//             {/* Form inputs and buttons here */}
//             {/* ... */}
//         </form>
//     );
// }
//
// export default MedicationForm;

//check box is working fine now but db is not refreshing
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../components/Firebase';

function MedicationForm({ onCancel }) {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [times, setTimes] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newMedication = {
            name,
            dosage,
            frequency,
            times,
        };

        try {
            await addDoc(collection(db, "medications"), newMedication);
            console.log("New medication added to Firestore.");
            setName('');
            setDosage('');
            setFrequency('');
            setTimes([]);
        } catch (error) {
            console.error("Error adding medication to Firestore: ", error);
        }
    };

    const handleAddTime = () => {
        setTimes([...times, '']);
    };

    const handleTimeChange = (index, event) => {
        const newTimes = [...times];
        newTimes[index] = event.target.value;
        setTimes(newTimes);
    };

    const handleRemoveTime = (index) => {
        const newTimes = [...times];
        newTimes.splice(index, 1);
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
                    <label htmlFor={`time-${index}`}>{`Time ${index + 1}:`}</label>
                    <input
                        type="time"
                        id={`time-${index}`}
                        value={time}
                        onChange={(e) => handleTimeChange(index, e)}
                        autoComplete="off"
                    />
                    <button type="button" onClick={() => handleRemoveTime(index)}>Remove</button>
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



