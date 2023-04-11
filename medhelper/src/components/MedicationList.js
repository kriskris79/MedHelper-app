import Medication from './Medication';

function MedicationList({ medications, toggleTaken }) {
    return (
        <ul className="medication-list">
            <li className="header">
                <p className="name">Name</p>
                <p className="dosage">Dosage</p>
                <p className="frequency">Frequency</p>
                <p className="time">Time</p>
                <p className="taken">Taken</p>
            </li>
            {medications.map((medication) => (
                <Medication
                    key={medication.id}
                    medication={medication}
                    toggleTaken={toggleTaken}
                />
            ))}
        </ul>
    );
}

export default MedicationList;