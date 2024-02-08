import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './scss/styles/_app.scss';
import "./scss/styles/_main.scss";
import MedicationList from './components/MedicationList';
import Register from './components/Register';
import Login from './components/Login';
import PasswordlessLogin from './components/PasswordlessLogin';

function App() {
    return (
        <Router>
            <div className="app">
                <nav>
                    <h1 className="title">My Medications List</h1>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/medications">Medications</Link>
                </nav>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/passwordless-login" element={<PasswordlessLogin />} />
                    <Route path="/medications" element={<MedicationList />} />
                    <Route path="/" element={<Navigate replace to="/medications" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

// import React from 'react';
// import './scss/styles/_app.scss';
// import "./scss/styles/_main.scss";
// import MedicationList from './components/MedicationList';
//
// function App() {
//     return (
//         <div className="app">
//             <h1 className="title">My Medications List</h1>
//             <MedicationList />
//         </div>
//     );
// }
//
// export default App;
