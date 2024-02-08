// User login with email and password
import React, { useState } from 'react';
import { auth } from '../config/Firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in successfully!");
            // Here, redirect the user or handle login success
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