import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

function MedicationForm({ onCancel, onAddMedication, userId }) { // Accept userId as a prop
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Ensure 'userId' is included in the new document
        const newMedication = {
            name,
            dosage,
            frequency,
            times: time ? [time] : [],
            userId // Use the passed userId
        };

        try {
            await addDoc(collection(db, "medications"), newMedication);
            // Clear form fields
            setName('');
            setDosage('');
            setFrequency('');
            setTime('');
            if (onAddMedication) onAddMedication(); // Optionally refresh the medication list
            if (onCancel) onCancel(); // Optionally close the form
        } catch (error) {
            console.error("Error adding medication to Firestore: ", error);
        }
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
                    placeholder="Please provide the medication name"
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
                    placeholder="Please specify the dosage. For example, '200mg in the morning.'"
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
                    placeholder="Please specify the frequency. If multiple doses, specify times."
                />
            </div>
            <div>
                <label htmlFor="time">Time:</label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    autoComplete="off"
                />
            </div>
            <div className="button-group">
                <button type="submit">Save Medication</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default MedicationForm;


// import React, { useState } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { db }  from '../config/Firebase';
//
// function MedicationForm({ onCancel, onAddMedication }) {
//     const [name, setName] = useState('');
//     const [dosage, setDosage] = useState('');
//     const [frequency, setFrequency] = useState('');
//     const [time, setTime] = useState(''); // Changed from `times` array to `time` string
//
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const newMedication = { name, dosage, frequency, times: time ? [time] : [] }; // Ensures `times` is an array with one time or empty
//         try {
//             await addDoc(collection(db, "medications"), newMedication);
//             setName('');
//             setDosage('');
//             setFrequency('');
//             setTime(''); // Reset to initial state with empty string
//             onAddMedication(); // Refresh the medication list
//             onCancel(); // Close the form
//         } catch (error) {
//             console.error("Error adding medication to Firestore: ", error);
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit} className="add-medication-form">
//             <div>
//                                    <label htmlFor="name">Medication Name:</label>
//                                    <input
//                                    type="text"
//                                     id="name"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     autoComplete="off"
//                                    placeholder="Please provide the medication name"
//                                 />
//                             </div>
//
//                             <div>
//                                 <label htmlFor="dosage">Dosage:</label>
//                                 <input
//                                     type="text"
//                                     id="dosage"
//                                     value={dosage}
//                                     onChange={(e) => setDosage(e.target.value)}
//                                     autoComplete="off"
//                                     placeholder="Please specify the dosage. For example, '200mg in the morning.'"
//                                 />
//                             </div>
//
//                             <div>
//                                 <label htmlFor="frequency">Frequency:</label>
//                                 <input
//                                     type="text"
//                                     id="frequency"
//                                     value={frequency}
//                                     onChange={(e) => setFrequency(e.target.value)}
//                                     autoComplete="off"
//                                     placeholder="Please specify the frequency. If multiple doses, specify times."
//                                 />
//                             </div>
//             <div>
//                 <label htmlFor="time">Time:</label>
//                 <input
//                     type="time"
//                     id="time"
//                     value={time}
//                     onChange={(e) => setTime(e.target.value)}
//                     autoComplete="off"
//                 />
//             </div>
//             <div className="button-group">
//                 <button type="submit">Save Medication</button>
//                 <button type="button" onClick={onCancel}>Cancel</button>
//             </div>
//         </form>
//     );
// }
//
// export default MedicationForm;


