import React, { useState } from 'react';
import { auth } from '../config/Firebase';
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
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="email"
                    id="register-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    autoComplete="email"
                />
                <input
                    type="password"
                    id="register-password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    autoComplete="new-password"
                />
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
}

export default Register;