import React from 'react';

function Medication({ medication, toggleTaken, onDelete }) {
    const { id, name, dosage, frequency, times, taken } = medication;
    let displayFrequency = frequency;

    if (frequency === 'x-times-a-day') {
        displayFrequency = `${times.length} times a day`;
    }

    // const handleTakenChange = (index) => {
    //     toggleTaken(id,index); // need to handel an index
    // };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this medication?')) {
            onDelete(id);
        }
    }

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
                            // <li key={index}>{time}
                            //     <input
                            //         type="checkbox"
                            //         checked={taken[index]}
                            //         onChange={() => handleTakenChange(index)}
                            //     />
                            // </li>
                            <li key={index}>{time}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="taken">
                <input
                    type="checkbox"
                    checked={taken}
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





//
// import React from 'react';
// import axios from 'axios';
//
// function Medication({ medication, toggleTaken, deleteMedication }) {
//     const { id, name, dosage, frequency, times, taken } = medication;
//     let displayFrequency = frequency;
//
//     if (frequency === 'x-times-a-day') {
//         displayFrequency = `${times.length} times a day`;
//     }
//
//     const handleDelete = async () => {
//         try {
//             const response = await axios.delete(`/api/medications/${id}`);
//             console.log('Medication deleted:', response.data);
//             deleteMedication(id);
//         } catch (error) {
//             console.error('Error deleting medication:', error);
//         }
//     };
//
//
//
//     const handleSetReminder = async () => {
//         try {
//             // Calculate the reminder times based on the medication times and the reminder time offset
//             const reminderTimes = times.map(time => {
//                 const medicationTime = new Date();
//                 const [hours, minutes] = time.split(':');
//                 medicationTime.setHours(hours);
//                 medicationTime.setMinutes(minutes);
//
//                 // Subtract 5 minutes from the medication time to set the reminder time
//                 const reminderTime = new Date(medicationTime.getTime() - 5 * 60 * 1000);
//                 return reminderTime.toISOString();
//             });
//
//             // Create the reminder using the API
//             const response = await axios.post(`/api/reminders`, {
//                 medicationId: id,
//                 reminderTimes,
//             });
//             console.log('Reminder set:', response.data);
//         } catch (error) {
//             console.error('Error setting reminder:', error);
//         }
//     };
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
//             <div className="buttons">
//                 <button className="delete" onClick={handleDelete}>
//                     Delete
//                 </button>
//                 {times && times.length > 0 && (
//                     <button className="set-reminder" onClick={handleSetReminder}>
//                         Set Reminder
//                     </button>
//                 )}
//             </div>
//         </li>
//     );
// }
//
// export default Medication;