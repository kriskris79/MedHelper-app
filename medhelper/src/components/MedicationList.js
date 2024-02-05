//still problems witch auto refreshing
// import React, { useEffect, useState } from 'react';
// import db from '../components/Firebase'; // Adjust the import path as needed
// import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
// import Medication from '../components/Medication'; // Adjust the import path as needed
// import MedicationForm from '../components/MedicationForm'; // Adjust the import path as needed
//
// function MedicationList() {
//     const [medications, setMedications] = useState([]);
//
//     // Function to fetch medications from Firestore
//     const fetchMedications = async () => {
//         try {
//             const querySnapshot = await getDocs(collection(db, "medications"));
//             const medsArray = querySnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setMedications(medsArray);
//         } catch (error) {
//             console.error('Error fetching medications:', error);
//         }
//     };
//
//     useEffect(() => {
//         fetchMedications();
//     }, []);
//
//     const toggleTaken = async (id) => {
//         const medicationRef = doc(db, "medications", id);
//         const medicationSnap = await getDoc(medicationRef);
//         if (medicationSnap.exists()) {
//             await updateDoc(medicationRef, {
//                 taken: !medicationSnap.data().taken
//             });
//             fetchMedications(); // Refresh the list after toggling
//         }
//     };
//
//     const onDelete = async (id) => {
//         await deleteDoc(doc(db, "medications", id));
//         fetchMedications(); // Refresh the list after deleting
//     };
//
//     return (
//         <div>
//             <ul className="medication-list">
//                 {medications.map((medication) => (
//                     <Medication key={medication.id} medication={medication} toggleTaken={() => toggleTaken(medication.id)} onDelete={() => onDelete(medication.id)} />
//                 ))}
//             </ul>
//             <MedicationForm onMedicationAdded={fetchMedications} />
//         </div>
//     );
// }
//
// export default MedicationList;

// box is working fine now but db is not refreshing aut.
import React, { useEffect, useState } from 'react';
import db from '../components/Firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import Medication from '../components/Medication';

function MedicationList() {
    const [medications, setMedications] = useState([]);

    // Define fetchMedications outside of useEffect to make it accessible elsewhere
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

    // Call fetchMedications inside useEffect
    useEffect(() => {
        fetchMedications();
    }, []);

    const toggleTaken = async (id) => {
        const medicationRef = doc(db, "medications", id);
        const medicationSnap = await getDoc(medicationRef);
        if (medicationSnap.exists()) {
            await updateDoc(medicationRef, {
                taken: !medicationSnap.data().taken
            });
            // Call fetchMedications again to update the UI after toggling
            fetchMedications();
        } else {
            console.log("No such medication document!");
        }
    };

    const onDelete = async (id) => {
        await deleteDoc(doc(db, "medications", id));
        // Filter out the deleted medication without needing to re-fetch the entire collection
        setMedications(medications.filter(medication => medication.id !== id));
    };

    return (
        <div>
            <ul className="medication-list">
                <li className="medication header">
                    <div className="name">Medication name</div>
                    <div className="dosage">Dose</div>
                    <div className="frequency">Frequency</div>
                    <div className="times">Time</div>
                    <div className="taken">Check-box </div>
                    <div className="delete">Delete</div>
                </li>
                {medications.map((medication) => (
                    <Medication key={medication.id} medication={medication} toggleTaken={() => toggleTaken(medication.id)} onDelete={() => onDelete(medication.id)} />
                ))}
            </ul>
        </div>
    );
}

export default MedicationList;

