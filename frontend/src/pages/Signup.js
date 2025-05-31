import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `https://deploy-mern-app-1-api.vercel.app/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Poppins', sans-serif; }
                .main-container {
                    display: flex;
                    width: 90%;
                    max-width: 1100px;
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    height: auto;
                    position: relative;
                    margin: 40px auto;
                }
                .left-section {
                    width: 50%;
                    position: relative;
                    overflow: hidden;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: linear-gradient(45deg, #FF6B6B, #FF8E8E);
                    color: white;
                }
                .left-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: url('/api/placeholder/600/800') no-repeat center center/cover;
                    opacity: 0.1;
                    z-index: 0;
                }
                .left-content { position: relative; z-index: 1; }
                .left-section h1 {
                    font-size: 42px;
                    font-weight: 700;
                    margin-bottom: 16px;
                    color: white;
                    letter-spacing: 1px;
                }
                .left-section p {
                    font-size: 16px;
                    line-height: 1.8;
                    margin-bottom: 30px;
                    font-weight: 300;
                    opacity: 0.9;
                }
                .feature-list {
                    list-style: none;
                    margin-top: 30px;
                }
                .feature-list li {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                }
                .feature-list i {
                    margin-right: 12px;
                    font-size: 18px;
                }
                .right-section {
                    width: 50%;
                    padding: 50px 40px;
                    background: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .container {
                    width: 100%;
                    max-width: 380px;
                }
                .container h2 {
                    color: #333;
                    margin-bottom: 10px;
                    font-size: 28px;
                    font-weight: 600;
                    text-align: left;
                }
                .welcome-text {
                    color: #777;
                    margin-bottom: 30px;
                    font-size: 15px;
                    text-align: left;
                }
                .input-group {
                    position: relative;
                    margin-bottom: 24px;
                }
                .input-group i {
                    position: absolute;
                    left: 15px;
                    top: 14px;
                    color: #FF6B6B;
                    font-size: 18px;
                }
                .input-field {
                    width: 100%;
                    padding: 12px 12px 12px 45px;
                    background: #f9f9f9;
                    border: 1px solid #eee;
                    border-radius: 10px;
                    font-size: 15px;
                    transition: all 0.3s ease;
                    color: #333;
                }
                .input-field:focus {
                    border-color: #FF6B6B;
                    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
                    outline: none;
                }
                .btn {
                    width: 100%;
                    padding: 14px;
                    background: #FF6B6B;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                    text-align: center;
                    box-shadow: 0 4px 10px rgba(255, 107, 107, 0.3);
                }
                .btn:hover {
                    background: #ff5252;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(255, 107, 107, 0.4);
                }
                .signin-link {
                    margin-top: 20px;
                    text-align: center;
                    color: #777;
                    font-size: 14px;
                }
                .signin-link a {
                    color: #FF6B6B;
                    text-decoration: none;
                    font-weight: 500;
                }
                footer {
                    position: absolute;
                    bottom: 15px;
                    text-align: center;
                    color: #999;
                    width: 100%;
                    left: 0;
                    font-size: 13px;
                }
                @media (max-width: 768px) {
                    .main-container { flex-direction: column; width: 95%; }
                    .left-section, .right-section { width: 100%; }
                    .left-section { padding: 30px; }
                    .left-section h1 { font-size: 32px; }
                    .right-section { padding: 30px; }
                }
            `}</style>
            <div className="main-container">
                <div className="left-section">
                    <div className="left-content">
                        <h1>VITAL SYNC</h1>
                        <p>
                            Revolutionizing healthcare monitoring with real-time analytics and IoT integration.
                            Our platform provides instant access to critical health metrics, empowering you
                            to take control of your wellbeing.
                        </p>
                        <ul className="feature-list">
                            <li><i className="fas fa-heartbeat"></i> Real-time vital monitoring</li>
                            <li><i className="fas fa-chart-line"></i> Advanced health analytics</li>
                            <li><i className="fas fa-mobile-alt"></i> Seamless device integration</li>
                            <li><i className="fas fa-shield-alt"></i> HIPAA-compliant security</li>
                        </ul>
                    </div>
                </div>
                <div className="right-section">
                    <div className="container">
                        <h2>Create Account</h2>
                        <p className="welcome-text">Join thousands of healthcare professionals and patients on our platform.</p>
                        <form onSubmit={handleSignup}>
                            <div className="input-group">
                                <i className="fas fa-user"></i>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    className="input-field"
                                    placeholder="Full Name"
                                    value={signupInfo.name}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <i className="fas fa-envelope"></i>
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    className="input-field"
                                    placeholder="Email Address"
                                    value={signupInfo.email}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <i className="fas fa-lock"></i>
                                <input
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    className="input-field"
                                    placeholder="Password"
                                    value={signupInfo.password}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn">Sign Up</button>
                            <div className="signin-link">
                                Already have an account? <Link to="/login">Sign In</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <footer>
                &copy; 2025 Vital Sync. All rights reserved.
            </footer>
            <ToastContainer />
        </>
    )
}

export default Signup
