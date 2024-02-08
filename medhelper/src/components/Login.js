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
        //test
        <div>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    autoComplete="email"
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    autoComplete="current-password"
                />
                <button type="submit" className="login-button">Login</button>
            </form>

        </div>
    );
}

export default Login;

