// User login with email and password
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/Firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in successfully to 'My Medications List'!");
            // Redirect the user or handle login success
            navigate('/medications'); // Redirect the user to the medications page
        } catch (error) {
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;

