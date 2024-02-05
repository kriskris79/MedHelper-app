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




//local storage
// import React, { useState, useEffect } from 'react';
//
// function MedicationForm({ onSave, onCancel }) {
//     const [name, setName] = useState('');
//     const [frequency, setFrequency] = useState('');
//     const [timesPerDay, setTimesPerDay] = useState('');
//     const [times, setTimes] = useState([]);
//     const [dosage, setDosage] = useState('');
//
//     useEffect(() => {
//         const storedMedication = localStorage.getItem('medication');
//         if (storedMedication) {
//             const { name, frequency, timesPerDay, times, dosage } = JSON.parse(storedMedication);
//             setName(name);
//             setFrequency(frequency);
//             setTimesPerDay(timesPerDay);
//             setTimes(times);
//             setDosage(dosage);
//         }
//     }, []);
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
//         const newMedication = {
//             name,
//             frequency: newFrequency,
//             times: newTimes,
//             dosage,
//         };
//
//         onSave(newMedication);
//
//         localStorage.setItem('medication', JSON.stringify(newMedication));
//
//         setName('');
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






// //local storage
// import React, { useState } from 'react';
//
// function MedicationForm({ onSave, onCancel }) {
//     const [name, setName] = useState('');
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
//         const newMedication = {
//             name,
//             frequency: newFrequency,
//             times: newTimes,
//             dosage,
//         };
//
//         onSave(newMedication);
//
//         setName('');
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








//mysql
// import React, { useState } from 'react';
// import axios from 'axios';
//
// function MedicationForm({ onSave, onCancel, token }) {
//     const [name, setName] = useState('');
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
//
//
//         axios.post(`${process.env.REACT_APP_API_URL}/medication2`, { name, frequency: newFrequency, times: newTimes, dosage }, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             withCredentials: true,
//         })
//             .then((response) => {
//                 console.log(response.data);
//                 onSave({ name, frequency: newFrequency, times: newTimes, dosage });
//                 setName('');
//                 setFrequency('');
//                 setTimesPerDay('');
//                 setTimes([]);
//                 setDosage('');
//             })
//             .catch((error) => {
//                 if (error.message === 'Network Error') {
//                     console.error('Network error:', error);
//                     alert('There was a network error. Please check your connection and try again.');
//                 } else {
//                     console.error('Error saving medication: ', error);
//                     alert('There was an error saving the medication. Please try again later.');
//                 }
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
//                                  <label htmlFor="frequency">Frequency</label>
//                                  <select id="frequency" value={frequency} onChange={(event) => setFrequency(event.target.value)}>
//                                      <option value="">-- Select Frequency --</option>
//                                      <option value="x-times-a-day">X times a day</option>
//                                  </select>
//                              </div>
//                          {frequency === 'hourly' && (
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