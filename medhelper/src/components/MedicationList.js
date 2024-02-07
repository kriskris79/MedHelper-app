import React, { useEffect, useState } from 'react';
import db from '../config/Firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Medication from '../components/Medication';
import MedicationForm from '../components/MedicationForm';

function MedicationList() {
    const [medications, setMedications] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchMedications = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "medications"));
            let medsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            medsArray = medsArray.sort((a, b) => {
                const timeA = a.times && a.times[0] ? a.times[0] : '23:59';
                const timeB = b.times && b.times[0] ? b.times[0] : '23:59';
                return timeA.localeCompare(timeB);
            });

            setMedications(medsArray);
        } catch (error) {
            console.error('Error fetching medications:', error);
        }
    };

    useEffect(() => {
        fetchMedications();
    }, []);

    const toggleTaken = async (id) => {
        const medicationRef = doc(db, "medications", id);
        await updateDoc(medicationRef, { taken: !medications.find(med => med.id === id).taken });
        fetchMedications();
    };

    const onDelete = async (id) => {
        await deleteDoc(doc(db, "medications", id));
        fetchMedications();
    };

    const handleHideForm = () => setShowForm(false);
    const handleShowForm = () => setShowForm(true);

    return (
        <div>
            <button onClick={handleShowForm} style={{ margin: '10px' }}>Add Medication</button>
            {showForm && <MedicationForm onCancel={handleHideForm} onAddMedication={fetchMedications} />}
            <ul className="medication-list">
                <li className="medication header">
                    <div className="name">Medication</div>
                    <div className="dosage">Dosage</div>
                    <div className="frequency">Frequency</div>
                    <div className="times">Time</div>
                    <div className="taken">Taken</div>
                    <div className="delete">Delete</div>
                </li>
                {medications.map((medication) => (
                    <Medication
                        key={medication.id}
                        medication={medication}
                        toggleTaken={toggleTaken}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
        </div>
    );
}

export default MedicationList;

