import React, { useEffect, useState } from 'react';
import db from '../components/Firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Medication from '../components/Medication';
import MedicationForm from "./MedicationForm";

function MedicationList() {
    const [medications, setMedications] = useState([]);
    const [showForm, setShowForm] = useState(false);

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

    useEffect(() => {
        fetchMedications();
    }, []);

    const toggleTaken = async (id) => {
        const medicationRef = doc(db, "medications", id);
        await updateDoc(medicationRef, { taken: !medications.find(med => med.id === id).taken });
        fetchMedications(); // Refresh list after updating
    };

    const onDelete = async (id) => {
        await deleteDoc(doc(db, "medications", id));
        fetchMedications(); // Refresh list after deleting
    };

    const handleHideForm = () => setShowForm(false);
    const handleShowForm = () => setShowForm(true);

    return (
        <div>
            <button onClick={handleShowForm}>Add Medication</button>
            {showForm && <MedicationForm onCancel={handleHideForm} onAddMedication={fetchMedications} />}

            <ul className="medication-list">
                <li className="medication header">
                    <div className="name">Medication Name</div>
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
                        toggleTaken={() => toggleTaken(medication.id)}
                        onDelete={() => onDelete(medication.id)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default MedicationList;
