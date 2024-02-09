import React, { useEffect, useState, useCallback } from 'react'; // Import useCallback
import { auth, db } from '../config/Firebase';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Medication from '../components/Medication';
import MedicationForm from '../components/MedicationForm';

function MedicationList() {
    const [medications, setMedications] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [user, loading] = useAuthState(auth);

    // Wrap fetchMedications with useCallback
    const fetchMedications = useCallback(async () => {
        if (!loading && user) {
            const q = query(collection(db, "medications"), where("userId", "==", user.uid));
            try {
                const querySnapshot = await getDocs(q);
                const medsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMedications(medsArray);
            } catch (error) {
                console.error('Error fetching medications:', error);
            }
        }
    }, [user, loading]); // Dependencies array for useCallback

    // useEffect hook to call fetchMedications
    useEffect(() => {
        fetchMedications();
    }, [fetchMedications]); // fetchMedications is a dependency here

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
            <button className="add-medication-button" onClick={handleShowForm} style={{ margin: '10px' }}>Add Medication</button>
            {showForm && <MedicationForm onCancel={handleHideForm} onAddMedication={fetchMedications} userId={user?.uid} />}
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




