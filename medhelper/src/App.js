import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/Firebase';
import './scss/styles/_app.scss';
import "./scss/styles/_main.scss";
import MedicationList from './components/MedicationList';
import Register from './components/Register';
import Login from './components/Login';
import PasswordlessLogin from './components/PasswordlessLogin';
import LogoutButton from './components/LogoutButton'; // Import LogoutButton

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); //  unsubscribe on unmount
    }, []);

    return (
        <Router>
            <div className="app">
                <nav>
                    <h1 className="title">My Medications List</h1>
                    {!user ? (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    ) : (
                        // Use LogoutButton component
                        <LogoutButton />
                    )}
                </nav>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/passwordless-login" element={<PasswordlessLogin />} />
                    <Route path="/medications" element={user ? <MedicationList /> : <Navigate replace to="/login" />} />
                    <Route path="/" element={<Navigate replace to={user ? "/medications" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

