// import React, { useState } from 'react';
//
// function MedicationForm({ onSave, onCancel }) {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [frequency, setFrequency] = useState('');
//     const [timesPerDay, setTimesPerDay] = useState('');
//     const [times, setTimes] = useState([]);
//     const [dosage, setDosage] = useState('');
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//
//         let newFrequency = frequency;
//         let newTimes = times;
//
//         if (frequency === 'x-times-a-day') {
//             newFrequency = `${timesPerDay} times a day`;
//             newTimes = times;
//         }
//
//         onSave({ name, description, frequency: newFrequency, times: newTimes, dosage });
//         setName('');
//         setDescription('');
//         setFrequency('');
//         setTimesPerDay('');
//         setTimes([]);
//         setDosage('');
//     };
//
//     const handleAddTime = () => {
//         setTimes((prevTimes) => [...prevTimes, '']);
//     };
//
//     const handleRemoveTime = (index) => {
//         setTimes((prevTimes) => {
//             const newTimes = [...prevTimes];
//             newTimes.splice(index, 1);
//             return newTimes;
//         });
//     };
//
//     const handleTimeChange = (event, index) => {
//         const newTimes = [...times];
//         newTimes[index] = event.target.value;
//         setTimes(newTimes);
//     };
//
//
//
//     return (
//         <form className="add-medication-form" onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="name">Medication Name</label>
//                 <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
//             </div>
//             <div>
//                 <label htmlFor="dosage">Dosage</label>
//                 <input type="text" id="dosage" value={dosage} onChange={(event) => setDosage(event.target.value)} />
//             </div>
//             <div>
//                 <label htmlFor="frequency">Frequency</label>
//                 <select id="frequency" value={frequency} onChange={(event) => setFrequency(event.target.value)}>
//                     <option value="">-- Select Frequency --</option>
//                     <option value="x-times-a-day">X times a day</option>
//                 </select>
//             </div>
//             {frequency === 'hourly' && (
//                 <div>
//                     <label htmlFor="timesPerDay">Every x hours</label>
//                     <input type="number" id="timesPerDay" value={timesPerDay} onChange={(event) => setTimesPerDay(event.target.value)} />
//                 </div>
//             )}
//             {frequency === 'x-times-a-day' && (
//                 <div>
//                     <label htmlFor="timesPerDay">X times a day</label>
//                     <input type="number" id="timesPerDay" value={timesPerDay} onChange={(event) => setTimesPerDay(event.target.value)} />
//                     {timesPerDay > 0 && (
//                         <div>
//                             <p>Please enter the times you need to take the medication:</p>
//                             {times.map((time, index) => (
//                                 <div key={index}>
//                                     <input type="time" value={time} onChange={(event) => handleTimeChange(event, index)} />
//                                     <button type="button" onClick={() => handleRemoveTime(index)}>Remove</button>
//                                 </div>
//                             ))}
//                             {times.length < timesPerDay && (
//                                 <button type="button" onClick={handleAddTime}>Add Time</button>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             )}
//             <div className="button-group">
//                 <button type="submit" className="btn-primary">
//                     Add Medication
//                 </button>
//                 <button type="button" className="btn-secondary" onClick={onCancel}>
//                     Cancel
//                 </button>
//             </div>
//         </form>
//     );
// }
//
// export default MedicationForm;


import React, { useState } from 'react';

function MedicationForm({ onSave, onCancel }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('');
    const [timesPerDay, setTimesPerDay] = useState('');
    const [times, setTimes] = useState([]);
    const [dosage, setDosage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        let newFrequency = frequency;
        let newTimes = times;

        if (frequency === 'x-times-a-day') {
            newFrequency = `${timesPerDay} times a day`;
            newTimes = times;
        }

        onSave({ name, description, frequency: newFrequency, times: newTimes, dosage });
        setName('');
        setDescription('');
        setFrequency('');
        setTimesPerDay('');
        setTimes([]);
        setDosage('');
    };

    const handleAddTime = () => {
        setTimes((prevTimes) => [...prevTimes, '']);
    };

    const handleRemoveTime = (index) => {
        setTimes((prevTimes) => {
            const newTimes = [...prevTimes];
            newTimes.splice(index, 1);
            return newTimes;
        });
    };

    const handleTimeChange = (event, index) => {
        const newTimes = [...times];
        newTimes[index] = event.target.value;
        setTimes(newTimes);
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
                <label htmlFor="description">Description</label>
                <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <div>
                <label htmlFor="frequency">Frequency</label>
                <select id="frequency" value={frequency} onChange={(event) => setFrequency(event.target.value)}>
                    <option value="">-- Select Frequency --</option>
                    <option value="hourly">Hourly</option>
                    <option value="x-times-a-day">X times a day</option>
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
                    {timesPerDay > 0 && (
                        <div>
                            <p>Please enter the times you need to take the medication:</p>
                            {times.map((time, index) => (
                                <div key={index}>
                                    <input type="time" value={time} onChange={(event) => handleTimeChange(event, index)} />
                                    <button type="button" onClick={() => handleRemoveTime(index)}>Remove</button>
                                </div>
                            ))}
                            {times.length < timesPerDay && (
                                <button type="button" onClick={handleAddTime}>Add Time</button>
                            )}
                        </div>
                    )}
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
