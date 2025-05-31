import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Alerts() {
    const navigate = useNavigate();
    const [popupOpen, setPopupOpen] = useState(false);    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.thingspeak.com/channels/2974147/fields/1.json?results=5');                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        // Initial fetch
        fetchData();

        // Set up polling every 30 seconds
        const pollInterval = setInterval(fetchData, 30000);

        // Cleanup function
        return () => clearInterval(pollInterval);
    }, []);

    if (loading) return (
        <div style={{ padding: 20 }}>
            <h2>Loading ThingSpeak Data...</h2>
        </div>
    );

    if (error) return (
        <div style={{ padding: 20 }}>
            <h2>Error Loading Data</h2>
            <p>{error}</p>
        </div>
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar (copied from Home.js, all navigation is SPA) */}
            <div className="sidebar" style={{
                width: 260,
                height: '100vh',
                background: 'white',
                padding: '30px 20px',
                position: 'fixed',
                left: 0,
                top: 0,
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 100
            }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                    <i className="fas fa-heartbeat" style={{ color: '#FF6B6B', fontSize: 24 }}></i>
                    <h2 style={{ color: '#FF6B6B', fontWeight: 700, fontSize: 24, letterSpacing: 1, marginLeft: 10 }}>VitalSync</h2>
                </div>
                <ul className="menu" style={{
                    listStyle: 'none',
                    padding: 0,
                    marginTop: 10,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 40 // Large space between buttons
                }}>
                    <li>
                        <button
                            type="button"
                            onClick={() => navigate('/home')}
                            style={{
                                background: window.location.pathname === '/home' ? '#FFF5F5' : 'none',
                                color: window.location.pathname === '/home' ? '#FF6B6B' : '#555',
                                border: 'none',
                                padding: 0,
                                margin: 0,
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: 'pointer',
                                borderRadius: 10
                            }}
                            className={window.location.pathname === '/home' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                            <i className="fas fa-chart-line" style={{ marginRight: 12, fontSize: 18 }}></i> <span>Dashboard</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => navigate('/live')}
                            style={{
                                background: window.location.pathname === '/live' ? '#FFF5F5' : 'none',
                                color: window.location.pathname === '/live' ? '#FF6B6B' : '#555',
                                border: 'none',
                                padding: 0,
                                margin: 0,
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: 'pointer',
                                borderRadius: 10
                            }}
                            className={window.location.pathname === '/live' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                            <i className="fas fa-heartbeat" style={{ marginRight: 12, fontSize: 18 }}></i> <span>Live Data</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => navigate('/alerts')}
                            style={{
                                background: window.location.pathname === '/alerts' ? '#FFF5F5' : 'none',
                                color: window.location.pathname === '/alerts' ? '#FF6B6B' : '#555',
                                border: 'none',
                                padding: 0,
                                margin: 0,
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: 'pointer',
                                borderRadius: 10
                            }}
                            className={window.location.pathname === '/alerts' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                            <i className="fas fa-bell" style={{ marginRight: 12, fontSize: 18 }}></i> <span>Alerts</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => navigate('/history')}
                            style={{
                                background: window.location.pathname === '/history' ? '#FFF5F5' : 'none',
                                color: window.location.pathname === '/history' ? '#FF6B6B' : '#555',
                                border: 'none',
                                padding: 0,
                                margin: 0,
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: 'pointer',
                                borderRadius: 10
                            }}
                            className={window.location.pathname === '/history' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                            <i className="fas fa-history" style={{ marginRight: 12, fontSize: 18 }}></i> <span>History</span>
                        </button>
                    </li>
                </ul>
                <div className="user-profile" id="user-profile" style={{ display: 'flex', alignItems: 'center', padding: '15px 0', borderTop: '1px solid #f1f1f1', cursor: 'pointer', position: 'relative' }} onClick={() => setPopupOpen((v) => !v)}>
                    <img src="images.jpeg" alt="User" style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10, background: '#eee' }} />
                    <div className="user-info" style={{ flexGrow: 1 }}>
                        <h4 style={{ fontSize: 14, margin: 0, color: '#333' }}>John Doe</h4>
                        <p style={{ fontSize: 12, color: '#888', margin: 0 }}>Patient</p>
                    </div>
                    {popupOpen && (
                        <div id="popup" className="popup-container" style={{ display: 'block', position: 'absolute', backgroundColor: 'white', border: '1px solid #ccc', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: 10, zIndex: 1000, borderRadius: 18, width: 200, bottom: 80, left: 20 }}>
                            <div className="popup-content">
                                <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                                    <li style={{ padding: '8px 12px' }}><a href="profile.html" style={{ textDecoration: 'none', color: '#333', display: 'block' }}>Profile</a></li>
                                    <li style={{ padding: '8px 12px' }}><a href="settings.html" style={{ textDecoration: 'none', color: '#333', display: 'block' }}>Settings</a></li>
                                    <li style={{ padding: '8px 12px' }}><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#333', width: '100%', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>            </div>            {/* Main Content */}
            <div className="main-content" style={{ marginLeft: 260, padding: '100px 30px 30px 30px', width: 'calc(100% - 260px)', minHeight: '100vh', boxSizing: 'border-box', overflowY: 'auto', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <div className="container" style={{ width: '100%', background: 'white', borderRadius: 16, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)', overflow: 'hidden', maxWidth: 900, padding: 0 }}>
                    <div className="header" style={{ background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)', padding: 25, color: 'white', textAlign: 'center', position: 'relative' }}>
                        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, letterSpacing: 0.5 }}>Patient Status History</h2>
                        <p style={{ fontSize: 14, opacity: 0.9, marginTop: 5 }}>Latest 5 condition readings</p>
                    </div>
                    
                    <div className="readings-container" style={{ padding: 20 }}>
                        {data?.feeds?.slice(-5).reverse().map((feed, index) => {
                            const value = parseInt(feed.field1);
                            const time = new Date(feed.created_at).toLocaleString();
                            const isNormal = value === 0;
                            
                            return (
                                <div key={index} style={{
                                    backgroundColor: isNormal ? '#e6ffe6' : '#ffe6e6',
                                    border: `2px solid ${isNormal ? '#4CAF50' : '#ff4d4d'}`,
                                    borderRadius: '8px',
                                    padding: '15px',
                                    marginBottom: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ 
                                            fontSize: '24px', 
                                            marginRight: '15px' 
                                        }}>
                                            {isNormal ? '✅' : '⚠️'}
                                        </span>
                                        <div>
                                            <h3 style={{ 
                                                margin: '0 0 5px 0',
                                                color: isNormal ? '#4CAF50' : '#ff4d4d',
                                                fontSize: '16px'
                                            }}>
                                                {isNormal ? 'Normal Condition' : 'Critical Condition'}
                                            </h3>
                                            <p style={{ 
                                                margin: 0,
                                                color: '#666',
                                                fontSize: '14px'
                                            }}>
                                                Recorded at: {time}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{
                                        backgroundColor: isNormal ? '#4CAF50' : '#ff4d4d',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}>
                                        Value: {value}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alerts;
