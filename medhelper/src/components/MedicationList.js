import React, { useEffect, useState } from 'react';
import db from '../components/Firebase';
import { collection, getDocs,deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Medication from '../components/Medication';

function MedicationList() {
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "medications"));
                const medsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMedications(medsArray);
            } catch (error) {
                console.error('Error fetching medications:', error);
            }
        };

        fetchMedications();
    }, []);

    const toggleTaken = async (id) => {
        // Add your logic to toggle the 'taken' status
        const medicationRef = doc(db, "medications", id);
        const medicationSnap = await getDocs(medicationRef);
        if (medicationSnap.exists()) {
            await updateDoc(medicationRef, {
                taken: !medicationSnap.data().taken
            });
        }
    };

    const onDelete = async (id) => {
        // Add your logic to delete a medication
        await deleteDoc(doc(db, "medications", id));
        setMedications(medications.filter(medication => medication.id !== id));
    };

    return (
        <ul className="medication-list">
            {medications.map((medication) => (
                <Medication key={medication.id} medication={medication} toggleTaken={() => toggleTaken(medication.id)} onDelete={() => onDelete(medication.id)} />
            ))}
        </ul>
    );
}

export default MedicationList;

// import React, { useEffect, useState } from 'react';
// import db from '../components/Firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import Medication from '../components/Medication';
//
// function MedicationList() {
//     const [medications, setMedications] = useState([]); // Ensure medications is initialized as an array
//
//     useEffect(() => {
//         const fetchMedications = async () => {
//             const querySnapshot = await getDocs(collection(db, "medications"));
//             const medsArray = querySnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setMedications(medsArray);
//         };
//
//         fetchMedications();
//     }, []);
//
//     return (
//         <ul className="medication-list">
//             {medications.map((medication) => ( // medications is guaranteed to be an array
//                 <Medication key={medication.id} medication={medication} />
//             ))}
//         </ul>
//     );
// }
//
// export default MedicationList;

//thi version is working
// import React from 'react';
// import Medication from './Medication';
//
// function MedicationList({ medications, toggleTaken, deleteMedication }) {
//     return (
//         <ul className="medication-list">
//             <li className="header">
//                 <p className="name">My Medication</p>
//                 <p className="dosage">Dosage</p>
//                 <p className="frequency">Frequency</p>
//                 <p className="time">Time</p>
//                 <p className="taken">Taken</p>
//                 <p className="delete">Delete Medication</p>
//             </li>
//             {medications.map((medication) => (
//                 <Medication
//                     key={medication.id}
//                     medication={medication}
//                     toggleTaken={toggleTaken}
//                     onDelete={deleteMedication}
//                 />
//             ))}
//         </ul>
//     );
// }
//
// export default MedicationList;

//
// import React, { useState } from 'react';
// import Medication from './Medication';
//
// function MedicationList({ medications }) {
//     const [meds, setMeds] = useState(medications);
//
//     const toggleTaken = (id) => {
//         const newMeds = meds.map((med) => {
//             if (med.id === id) {
//                 return { ...med, taken: !med.taken };
//             }
//             return med;
//         });
//         setMeds(newMeds);
//     };
//
//     const setNotifications = () => {
//         if (!('Notification' in window)) {
//             console.log('This browser does not support system notifications');
//             return;
//         }
//
//         if (Notification.permission === 'granted') {
//             const now = new Date();
//             const oneMinute = 60 * 1000;
//             const fiveMinutes = 5 * oneMinute;
//
//             meds.forEach((med) => {
//                 if (med.frequency === 'hourly') {
//                     const title = `${med.name} - Hourly Reminder`;
//                     const options = {
//                         body: `It's time to take your ${med.name}`,
//                         icon: 'path/to/icon.png',
//                     };
//
//                     setInterval(() => {
//                         new Notification(title, options);
//                     }, med.timesPerDay * oneMinute);
//                 } else if (med.frequency === 'x-times-a-day') {
//                     const times = med.times.map((time) => {
//                         const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), time.substr(0, 2), time.substr(3, 2));
//                         if (date < now) {
//                             date.setDate(now.getDate() + 1);
//                         }
//                         return date.getTime() - fiveMinutes;
//                     });
//
//                     times.forEach((time) => {
//                         setInterval(() => {
//                             const title = `${med.name} - Medication Reminder`;
//                             const options = {
//                                 body: `It's time to take your ${med.name}`,
//                                 icon: 'path/to/icon.png',
//                             };
//                             new Notification(title, options);
//                         }, time - now.getTime());
//                     });
//                 }
//             });
//         } else if (Notification.permission !== 'denied') {
//             Notification.requestPermission().then((permission) => {
//                 if (permission === 'granted') {
//                     setNotifications();
//                 }
//             });
//         }
//     };
//
//     return (
//         <div>
//             <ul className="medication-list">
//                 {meds.map((medication) => (
//                     <Medication key={medication.id} medication={medication} toggleTaken={toggleTaken} />
//                 ))}
//             </ul>
//             <button className="set-notifications" onClick={setNotifications}>
//                 Set Notifications
//             </button>
//         </div>
//     );
// }
//
// export default MedicationList;