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

// import React, { useState } from 'react';
// import axios from 'axios';
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
//         axios.post(process.env.REACT_APP_API_URL + '/api/medication2', { name, description, frequency: newFrequency, times: newTimes, dosage }, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then((response) => {
//                 console.log(response.data);
//                 onSave({ name, description, frequency: newFrequency, times: newTimes, dosage });
//                 setName('');
//                 setDescription('');
//                 setFrequency('');
//                 setTimesPerDay('');
//                 setTimes([]);
//                 setDosage('');
//             })
//             .catch((error) => {
//                 console.error('Error saving medication: ', error);
//                 alert('There was an error saving the medication. Please try again later.');
//             });
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
import axios from 'axios';

function MedicationForm({ onSave, onCancel, token }) {
    const [name, setName] = useState('');
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

        // console.log(process.env.REACT_APP_API_URL);
        // const postUrl = process.env.REACT_APP_API_URL + '/api/medication2';
        // console.log(postUrl);

        // axios.post(postUrl, { name, frequency: newFrequency, times: newTimes, dosage }, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        // axios.post('http://mysql2.kkak.dreamhosters.com/medication2', { name, frequency: newFrequency, times: newTimes, dosage }, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        axios.post('http://mysql2.kkak.dreamhosters.com:3001/medication2', { name, frequency: newFrequency, times: newTimes, dosage }, {
            headers: {
                'Authorization': `Bearer ${token}`

        // axios.post(process.env.REACT_APP_API_URL, { name, frequency: newFrequency, times: newTimes, dosage }, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data);
                onSave({ name, frequency: newFrequency, times: newTimes, dosage });
                setName('');
                setFrequency('');
                setTimesPerDay('');
                setTimes([]);
                setDosage('');
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    console.error('Network error:', error);
                    alert('There was a network error. Please check your connection and try again.');
                } else {
                    console.error('Error saving medication: ', error);
                    alert('There was an error saving the medication. Please try again later.');
                }
            });
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
                                 <label htmlFor="frequency">Frequency</label>
                                 <select id="frequency" value={frequency} onChange={(event) => setFrequency(event.target.value)}>
                                     <option value="">-- Select Frequency --</option>
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