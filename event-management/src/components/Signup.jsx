import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "../firebase"; 

function Signup() {
    const [signup, setSignup] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignup({ ...signup, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = signup;

        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            alert("Signup successful!");
            navigate("/login"); // Redirect after successful signup
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="signup-container">
                <div className="signup-info">
                    <h2>Let's Get Started With EventEase</h2> {/* Updated to "EventEase" */}
                    <ul>
                        <li>✔ Offering You The Best Services You Need For Your Venue</li>
                    </ul>
                </div>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h3>Sign Up to EventEase</h3> {/* Updated to "EventEase" */}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            placeholder="Enter Name"
                            value={signup.name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter Email"
                            value={signup.email}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Enter Password"
                            value={signup.password}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </>
    );
}

export default Signup;
