// import React from 'react';
//
// function Medication({ medication, toggleTaken }) {
//     const { id, name, dosage, frequency, times, taken } = medication;
//     let displayFrequency = frequency;
//
//     if (frequency === 'x-times-a-day') {
//         displayFrequency = `${times.length} times a day`;
//     }
//
//     return (
//         <li className={`medication ${taken ? 'taken' : ''}`} onClick={() => toggleTaken(id)}>
//             <h2 className="name">{name}</h2>
//             <p className="dosage">{dosage}</p>
//             <p className="frequency">{displayFrequency}</p>
//             {times && times.length > 0 && (
//                 <div>
//                     <p className="times">Times:</p>
//                     <ul className="times-list">
//                         {times.map((time, index) => (
//                             <li key={index}>{time}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </li>
//     );
// }
//
// export default Medication;

import React from 'react';
import axios from 'axios';

function Medication({ medication, toggleTaken, deleteMedication }) {
    const { id, name, dosage, frequency, times, taken } = medication;
    let displayFrequency = frequency;

    if (frequency === 'x-times-a-day') {
        displayFrequency = `${times.length} times a day`;
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/medications/${id}`);
            console.log('Medication deleted:', response.data);
            deleteMedication(id);
        } catch (error) {
            console.error('Error deleting medication:', error);
        }
    };

    const handleSetReminder = async () => {
        try {
            const response = await axios.post(`/api/reminders`, {
                medicationId: id,
                times,
            });
            console.log('Reminder set:', response.data);
        } catch (error) {
            console.error('Error setting reminder:', error);
        }
    };

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
            <div className="buttons">
                <button className="delete" onClick={handleDelete}>
                    Delete
                </button>
                {times && times.length > 0 && (
                    <button className="set-reminder" onClick={handleSetReminder}>
                        Set Reminder
                    </button>
                )}
            </div>
        </li>
    );
}

export default Medication;