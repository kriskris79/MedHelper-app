// LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Firebase';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;