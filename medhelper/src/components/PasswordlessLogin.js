// Initiating passwordless sign-in
import React, { useState } from 'react';
import { auth } from '../config/Firebase';
import { sendSignInLinkToEmail } from "firebase/auth";

function PasswordlessLogin() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const actionCodeSettings = {
            url: 'http://localhost:3000/finishSignIn', // Adjust this URL as needed
            handleCodeInApp: true,
        };
        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email); // Save email in localStorage
            alert("Check your email for the sign-in link.");
        } catch (error) {
            alert(`Failed to send sign-in link: ${error.message}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="krzysztofkakolewski@googlemail.com" required />
                <button type="submit">Send Sign-In Link</button>
            </form>
        </div>
    );
}

export default PasswordlessLogin;