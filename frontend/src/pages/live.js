import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Live() {
    const navigate = useNavigate();
    const [popupOpen, setPopupOpen] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [vitalData, setVitalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ecgData, setEcgData] = useState([]);

    // Fetch real-time data from ThingSpeak
    useEffect(() => {
        if (isPaused) return;

        const fetchData = () => {
            // Fetch the most recent 100 points for ECG data
            Promise.all([
                fetch('https://api.thingspeak.com/channels/2840540/feeds.json?results=2'),
                fetch('https://api.thingspeak.com/channels/2840540/fields/5.json?results=100')
            ])
                .then(([vitalRes, ecgRes]) => Promise.all([vitalRes.json(), ecgRes.json()]))
                .then(([vitalData, ecgData]) => {
                    if (vitalData && vitalData.feeds && vitalData.feeds.length > 0) {
                        setVitalData(vitalData.feeds[0]); // Use the most recent entry
                    }
                    if (ecgData && ecgData.feeds) {
                        // Extract field5 values and timestamps
                        const points = ecgData.feeds.map(feed => ({
                            value: parseFloat(feed.field5) || 0,
                            time: new Date(feed.created_at)
                        }));
                        setEcgData(points);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                    setLoading(false);
                });
        };

        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 15000); // Update every 15 seconds

        return () => clearInterval(interval);
    }, [isPaused]);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    // Pause/Resume
    const handlePause = () => {
        setIsPaused((prev) => !prev);                                                                                                                                                                                                                   
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
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
                <ul className="menu" style={{ listStyle: 'none', padding: 0, marginTop: 10, flexGrow: 1 }}>
                    <li>
                        <button
                            type="button"
                            onClick={() => navigate('/home')}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                margin: 0,
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 16,
                                fontWeight: 500,
                                color: '#555',
                                cursor: 'pointer',
                                borderRadius: 10
                            }}
                            className="sidebar-link"
                        >
                            <i className="fas fa-chart-line" style={{ marginRight: 12, fontSize: 18 }}></i> <span>Dashboard</span>
                        </button>
                    </li>
                    <li><a href="live.html" className="active"><i className="fas fa-heartbeat"></i> <span>Live Data</span></a></li>
                    <li><a href="alerts.html"><i className="fas fa-bell"></i> <span>Alerts</span></a></li>
                    <li><a href="history.html"><i className="fas fa-history"></i> <span>History</span></a></li>
                </ul>
                <div className="user-profile" id="user-profile" style={{ display: 'flex', alignItems: 'center', padding: '15px 0', borderTop: '1px solid #f1f1f1', cursor: 'pointer', position: 'relative' }} onClick={() => setPopupOpen((v) => !v)}>
                    <img src="images.jpeg" alt="User" style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10, background: '#eee' }} />
                    <div className="user-info" style={{ flexGrow: 1 }}>
                        <h4 style={{ fontSize: 14, margin: 0, color: '#333' }}>John Doe</h4>
                        <p style={{ fontSize: 12, color: '#888', margin: 0 }}>Patient</p>
                    </div>
                    {/* Popup */}
                    {popupOpen && (
                        <div id="popup" className="popup-container" style={{
                            display: 'block',
                            position: 'absolute',
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: 10,
                            zIndex: 1000,
                            borderRadius: 18,
                            width: 200,
                            bottom: 80,
                            left: 20
                        }}>
                            <div className="popup-content">
                                <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                                    <li style={{ padding: '8px 12px' }}><a href="profile.html" style={{ textDecoration: 'none', color: '#333', display: 'block' }}>Profile</a></li>
                                    <li style={{ padding: '8px 12px' }}><a href="settings.html" style={{ textDecoration: 'none', color: '#333', display: 'block' }}>Settings</a></li>
                                    <li style={{ padding: '8px 12px' }}><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#333', width: '100%', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Main Content */}
            <div className="main-content" style={{ marginLeft: 260, padding: '30px', width: 'calc(100% - 260px)', minHeight: '100vh', boxSizing: 'border-box', overflowY: 'auto' }}>
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                    <h1 style={{ fontSize: 28, color: '#333', fontWeight: 600 }}>Live Data Monitoring</h1>
                    <div className="header-actions" style={{ display: 'flex', gap: 15 }}>
                        <button className="control-btn" onClick={handlePause} style={{ background: '#f8f8f8', border: 'none', padding: '8px 15px', borderRadius: 8, display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#555' }}>
                            <i className={isPaused ? 'fas fa-play' : 'fas fa-pause'} style={{ marginRight: 8, color: '#FF6B6B' }}></i> 
                            {isPaused ? 'Resume' : 'Pause'}
                        </button>
                    </div>
                </div>                {/* Vitals Grid */}
                <div className="vitals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, marginBottom: 30, overflowX: 'auto' }}>
                    <div className="vital-card" style={{ background: 'white', padding: 25, borderRadius: 16, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', position: 'relative', overflow: 'hidden' }}>
                        <div className="icon" style={{ background: '#fff5f5', width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                            <i className="fas fa-heartbeat" style={{ color: '#FF6B6B', fontSize: 22 }}></i>
                        </div>
                        <h4 style={{ fontSize: 15, color: '#666', marginBottom: 10, fontWeight: 500 }}>Heart Rate</h4>
                        <div className="value" style={{ fontSize: 28, fontWeight: 700, color: '#333', marginBottom: 5 }}>
                            {loading ? "Loading..." : (vitalData?.field7 || "N/A")} BPM
                        </div>
                    </div>

                    <div className="vital-card" style={{ background: 'white', padding: 25, borderRadius: 16, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', position: 'relative', overflow: 'hidden' }}>
                        <div className="icon" style={{ background: '#fff5f5', width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                            <i className="fas fa-lungs" style={{ color: '#FF6B6B', fontSize: 22 }}></i>
                        </div>
                        <h4 style={{ fontSize: 15, color: '#666', marginBottom: 10, fontWeight: 500 }}>SpO₂ Level</h4>
                        <div className="value" style={{ fontSize: 28, fontWeight: 700, color: '#333', marginBottom: 5 }}>
                            {loading ? "Loading..." : (vitalData?.field3 || "N/A")}%
                        </div>
                    </div>

                    <div className="vital-card" style={{ background: 'white', padding: 25, borderRadius: 16, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', position: 'relative', overflow: 'hidden' }}>
                        <div className="icon" style={{ background: '#fff5f5', width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                            <i className="fas fa-thermometer-half" style={{ color: '#FF6B6B', fontSize: 22 }}></i>
                        </div>
                        <h4 style={{ fontSize: 15, color: '#666', marginBottom: 10, fontWeight: 500 }}>Temperature</h4>
                        <div className="value" style={{ fontSize: 28, fontWeight: 700, color: '#333', marginBottom: 5 }}>
                            {loading ? "Loading..." : (vitalData?.field1 || "N/A")}°C
                        </div>
                    </div>

                    <div className="vital-card" style={{ background: 'white', padding: 25, borderRadius: 16, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', position: 'relative', overflow: 'hidden' }}>
                        <div className="icon" style={{ background: '#fff5f5', width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                            <i className="fas fa-temperature-high" style={{ color: '#FF6B6B', fontSize: 22 }}></i>
                        </div>
                        <h4 style={{ fontSize: 15, color: '#666', marginBottom: 10, fontWeight: 500 }}>Body Temperature</h4>
                        <div className="value" style={{ fontSize: 28, fontWeight: 700, color: '#333', marginBottom: 5 }}>
                            {loading ? "Loading..." : (vitalData?.field4 || "N/A")}°C
                        </div>
                    </div>

                    <div className="vital-card" style={{ background: 'white', padding: 25, borderRadius: 16, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', position: 'relative', overflow: 'hidden' }}>
                        <div className="icon" style={{ background: '#fff5f5', width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                            <i className="fas fa-tint" style={{ color: '#FF6B6B', fontSize: 22 }}></i>
                        </div>
                        <h4 style={{ fontSize: 15, color: '#666', marginBottom: 10, fontWeight: 500 }}>Humidity</h4>
                        <div className="value" style={{ fontSize: 28, fontWeight: 700, color: '#333', marginBottom: 5 }}>
                            {loading ? "Loading..." : (vitalData?.field2 || "N/A")}%
                        </div>
                    </div>
                </div>                {/* ECG Chart Section */}
                <section className="ecg-section" style={{ background: 'white', borderRadius: 16, padding: 25, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', marginTop: 30 }}>
                    <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 style={{ fontSize: 20, color: '#333', fontWeight: 600 }}>ECG Signal Monitor</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                            <div style={{ fontSize: 14, color: '#666' }}>
                                Update Rate: 15s
                            </div>
                            <div style={{ fontSize: 14, color: '#666' }}>
                                Last Reading: {ecgData.length > 0 ? new Date(ecgData[ecgData.length - 1].time).toLocaleTimeString() : 'N/A'}
                            </div>
                        </div>
                    </div>
                    <div className="chart-container" style={{ width: '100%', height: 400, position: 'relative', background: '#f8f8f8', borderRadius: 12, padding: '20px 40px 40px 60px' }}>
                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                Loading ECG data...
                            </div>
                        ) : (
                            <>
                                {/* Y-axis labels */}
                                <div style={{ position: 'absolute', left: 10, top: 0, bottom: 40, width: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    {[5, 4, 3, 2, 1, 0, -1, -2, -3].map((value) => (
                                        <span key={value} style={{ fontSize: 12, color: '#666' }}>{value}mV</span>
                                    ))}
                                </div>
                                {/* X-axis labels */}
                                <div style={{ position: 'absolute', left: 60, right: 20, bottom: 10, height: 20, display: 'flex', justifyContent: 'space-between' }}>
                                    {Array.from({ length: 11 }).map((_, i) => (
                                        <span key={i} style={{ fontSize: 12, color: '#666' }}>{i}s</span>
                                    ))}
                                </div>
                                <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none">
                                    {/* Background grid */}
                                    <defs>
                                        <pattern id="smallGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#eee" strokeWidth="0.5"/>
                                        </pattern>
                                        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                                            <rect width="100" height="100" fill="url(#smallGrid)"/>
                                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#ddd" strokeWidth="1"/>
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />

                                    {/* Center line */}
                                    <line x1="0" y1="200" x2="1000" y2="200" stroke="#999" strokeWidth="1" strokeDasharray="5,5"/>
                                    
                                    {/* ECG line */}
                                    <polyline
                                        fill="none"
                                        stroke="#FF6B6B"
                                        strokeWidth="2"
                                        points={ecgData.map((point, i) => {
                                            const x = (i / (ecgData.length - 1)) * 1000;
                                            // Scale to fit in the visible range (-3mV to 5mV)
                                            const normalizedValue = (parseFloat(point.value) || 0);
                                            const y = 200 - (normalizedValue * 40); // 40 pixels per mV
                                            return `${x},${y}`;
                                        }).join(' ')}
                                    />
                                </svg>
                                {/* Current value indicator */}
                                <div style={{ position: 'absolute', right: 20, top: 20, background: 'white', padding: '8px 12px', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                    <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Current</div>
                                    <div style={{ fontSize: 16, color: '#333', fontWeight: 500 }}>
                                        {ecgData.length > 0 ? `${parseFloat(ecgData[ecgData.length - 1].value).toFixed(2)} mV` : 'N/A'}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Live;
