import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // User registered successfully
            console.log("User registered: ", userCredential.user);

            // Send verification email
            await sendEmailVerification(userCredential.user);
            alert("Verification email sent. Please check your inbox.");

            // Optional: Redirect the user or update UI
        } catch (error) {
            // Handle errors here
            console.error("Registration or verification email error: ", error);
            alert(`Failed to register or send verification email: ${error.message}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;