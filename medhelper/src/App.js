import React from 'react';
import './scss/styles/_app.scss';
import "./scss/styles/_main.scss";
import MedicationList from './components/MedicationList';

function App() {
    return (
        <div className="app">
            <h1 className="title">My Medications List</h1>
            <MedicationList />
        </div>
    );
}

export default App;
