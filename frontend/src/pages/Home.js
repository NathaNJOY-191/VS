import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/'); // Redirect to landing page
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <div className="sidebar" style={{
                width: 260,
                height: "100vh",
                background: "white",
                padding: "30px 20px",
                position: "fixed",
                left: 0,
                top: 0,
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column"
            }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                    <i className="fas fa-heartbeat" style={{ color: "#FF6B6B", fontSize: 24 }}></i>
                    <h2 style={{ color: "#FF6B6B", fontWeight: 700, fontSize: 24, letterSpacing: 1, marginLeft: 10 }}>VitalSync</h2>
                </div>
                <ul className="menu" style={{
                    listStyle: 'none',
                    padding: 0,
                    marginTop: 10,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 15 // Match the HTML: 15px gap between buttons
                }}>
                    <li>
                        <button
                            type="button"
                            onClick={() => navigate('/home')}
                            style={{
                                background: window.location.pathname === '/home' ? '#FFF5F5' : 'none',
                                color: window.location.pathname === '/home' ? '#FF6B6B' : '#666',
                                border: 'none',
                                padding: '12px 15px',
                                margin: 0,
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: 'pointer',
                                borderRadius: 10,
                                boxShadow: window.location.pathname === '/home' ? '0 5px 10px rgba(255, 107, 107, 0.2)' : 'none',
                                minHeight: 48,
                                transition: 'all 0.3s',
                            }}
                            className={window.location.pathname === '/home' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                            <i className="fas fa-chart-line" style={{ marginRight: 12, fontSize: 18, width: 22, textAlign: 'center' }}></i> <span>Dashboard</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => navigate('/live')}
                            style={{
                                background: window.location.pathname === '/live' ? '#FFF5F5' : 'none',
                                color: window.location.pathname === '/live' ? '#FF6B6B' : '#666',
                                border: 'none',
                                padding: '12px 15px',
                                margin: 0,
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: 'pointer',
                                borderRadius: 10,
                                boxShadow: window.location.pathname === '/live' ? '0 5px 10px rgba(255, 107, 107, 0.2)' : 'none',
                                minHeight: 48,
                                transition: 'all 0.3s',
                            }}
                            className={window.location.pathname === '/live' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                            <i className="fas fa-heartbeat" style={{ marginRight: 12, fontSize: 18, width: 22, textAlign: 'center' }}></i> <span>Live Data</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => navigate('/alerts')}
                            style={{
                                background: window.location.pathname === '/alerts' ? '#FFF5F5' : 'none',
                                color: window.location.pathname === '/alerts' ? '#FF6B6B' : '#666',
                                border: 'none',
                                padding: '12px 15px',
                                margin: 0,
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: 'pointer',
                                borderRadius: 10,
                                boxShadow: window.location.pathname === '/alerts' ? '0 5px 10px rgba(255, 107, 107, 0.2)' : 'none',
                                minHeight: 48,
                                transition: 'all 0.3s',
                            }}
                            className={window.location.pathname === '/alerts' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                            <i className="fas fa-bell" style={{ marginRight: 12, fontSize: 18, width: 22, textAlign: 'center' }}></i> <span>Alerts</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => navigate('/history')}
                            style={{
                                background: window.location.pathname === '/history' ? '#FFF5F5' : 'none',
                                color: window.location.pathname === '/history' ? '#FF6B6B' : '#666',
                                border: 'none',
                                padding: '12px 15px',
                                margin: 0,
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: 'pointer',
                                borderRadius: 10,
                                boxShadow: window.location.pathname === '/history' ? '0 5px 10px rgba(255, 107, 107, 0.2)' : 'none',
                                minHeight: 48,
                                transition: 'all 0.3s',
                            }}
                            className={window.location.pathname === '/history' ? 'sidebar-link active' : 'sidebar-link'}
                        >
                            <i className="fas fa-history" style={{ marginRight: 12, fontSize: 18, width: 22, textAlign: 'center' }}></i> <span>History</span>
                        </button>
                    </li>
                </ul>
                <div className="user-profile" style={{ display: 'flex', alignItems: 'center', padding: '15px 0', borderTop: '1px solid #f1f1f1', cursor: 'pointer' }}>
                    <img src="images.jpeg" alt="User" style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10, background: '#eee' }} />
                    <div className="user-info" style={{ flexGrow: 1 }}>
                        <h4 style={{ fontSize: 14, margin: 0, color: '#333' }}>John Doe</h4>
                        <p style={{ fontSize: 12, color: '#888', margin: 0 }}>Patient</p>
                    </div>
                </div>
                <button className="filter-btn apply-btn" style={{ marginTop: 20, background: '#FF6B6B', color: 'white', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="main-content" style={{ marginLeft: 260, padding: 30, width: 'calc(100% - 260px)' }}>
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                    <h1 style={{ fontSize: 28, color: '#333', fontWeight: 600 }}>Heart Monitoring</h1>
                    <div className="header-actions" style={{ display: 'flex', gap: 10 }}>
                        <button className="header-btn" style={{ background: 'white', border: 'none', padding: '8px 15px', borderRadius: 8, display: 'flex', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)' }}><i className="fas fa-download" style={{ marginRight: 8, color: '#FF6B6B' }}></i> Export Data</button>
                        <button className="header-btn" style={{ background: 'white', border: 'none', padding: '8px 15px', borderRadius: 8, display: 'flex', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)' }}><i className="fas fa-share-alt" style={{ marginRight: 8, color: '#FF6B6B' }}></i> Share</button>
                    </div>
                </div>
                {/* Hero Section */}
                <section className="hero" style={{ background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)', borderRadius: 16, padding: 40, color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 20px rgba(255, 107, 107, 0.2)', marginBottom: 30 }}>
                    <div className="hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: 600 }}>
                        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 10 }}>Real-Time Heart Monitoring</h2>
                        <p style={{ fontSize: 16, marginBottom: 25, opacity: 0.9 }}>Track your heart health metrics with precision and convenience. Our advanced sensors provide accurate real-time data to help you maintain optimal health.</p>
                        <button
                            className="cta-button"
                            style={{ display: 'inline-block', padding: '12px 25px', background: 'white', color: '#FF6B6B', textDecoration: 'none', borderRadius: 10, fontWeight: 600, fontSize: 15, transition: 'all 0.3s ease', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
                            onClick={e => e.preventDefault()}
                        >
                            View Detailed Report
                        </button>
                    </div>
                </section>
                {/* Live Data Section */}
                <section className="data-section" style={{ marginTop: 30 }}>
                    <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 style={{ fontSize: 20, color: '#333', fontWeight: 600 }}>Recent Health Metrics</h3>
                        <button className="refresh-btn" style={{ background: 'transparent', border: 'none', color: '#FF6B6B', display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}><i className="fas fa-sync-alt" style={{ marginRight: 5 }}></i> Refresh</button>
                    </div>
                    <div className="data-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                        <div className="data-card" style={{ background: 'white', padding: 25, borderRadius: 16, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', textAlign: 'center', transition: 'all 0.3s ease' }}>
                            <div className="icon" style={{ background: '#fff5f5', width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                                <i className="fas fa-heartbeat" style={{ color: '#FF6B6B', fontSize: 22 }}></i>
                            </div>
                            <h4 style={{ fontSize: 15, color: '#666', marginBottom: 10, fontWeight: 500 }}>ECG Signal</h4>
                            <p id="ecg" style={{ fontSize: 28, fontWeight: 700, color: '#333', margin: 0 }}></p>
                            <span className="status" style={{ display: 'inline-block', padding: '5px 10px', background: '#e6fff2', color: '#00cc66', borderRadius: 20, fontSize: 12, marginTop: 10, fontWeight: 500 }}>Healthy</span>
                        </div>
                        <div className="data-card" style={{ background: 'white', padding: 25, borderRadius: 16, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', textAlign: 'center', transition: 'all 0.3s ease' }}>
                            <div className="icon" style={{ background: '#fff5f5', width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                                <i className="fas fa-lungs" style={{ color: '#FF6B6B', fontSize: 22 }}></i>
                            </div>
                            <h4 style={{ fontSize: 15, color: '#666', marginBottom: 10, fontWeight: 500 }}>SpO₂ Level</h4>
                            <p id="spo2" style={{ fontSize: 28, fontWeight: 700, color: '#333', margin: 0 }}></p>
                            <span className="status" style={{ display: 'inline-block', padding: '5px 10px', background: '#e6fff2', color: '#00cc66', borderRadius: 20, fontSize: 12, marginTop: 10, fontWeight: 500 }}>Normal</span>
                        </div>
                        <div className="data-card" style={{ background: 'white', padding: 25, borderRadius: 16, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', textAlign: 'center', transition: 'all 0.3s ease' }}>
                            <div className="icon" style={{ background: '#fff5f5', width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                                <i className="fas fa-thermometer-half" style={{ color: '#FF6B6B', fontSize: 22 }}></i>
                            </div>
                            <h4 style={{ fontSize: 15, color: '#666', marginBottom: 10, fontWeight: 500 }}>Temperature</h4>
                            <p id="temperature" style={{ fontSize: 28, fontWeight: 700, color: '#333', margin: 0 }}></p>
                            <span className="status" style={{ display: 'inline-block', padding: '5px 10px', background: '#e6fff2', color: '#00cc66', borderRadius: 20, fontSize: 12, marginTop: 10, fontWeight: 500 }}>Normal</span>
                        </div>
                        <div className="data-card" style={{ background: 'white', padding: 25, borderRadius: 16, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', textAlign: 'center', transition: 'all 0.3s ease' }}>
                            <div className="icon" style={{ background: '#fff5f5', width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                                <i className="fas fa-tachometer-alt" style={{ color: '#FF6B6B', fontSize: 22 }}></i>
                            </div>
                            <h4 style={{ fontSize: 15, color: '#666', marginBottom: 10, fontWeight: 500 }}>Heart Rate</h4>
                            <p id="heart-rate" style={{ fontSize: 28, fontWeight: 700, color: '#333', margin: 0 }}></p>
                            <span className="status" style={{ display: 'inline-block', padding: '5px 10px', background: '#e6fff2', color: '#00cc66', borderRadius: 20, fontSize: 12, marginTop: 10, fontWeight: 500 }}>Resting</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
