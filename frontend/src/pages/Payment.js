import React from "react";

function Payment() {
  const features = [
    "24/7 Health Monitoring",
    "Real-time Alert System",
    "Advanced Analytics Dashboard",
    "Emergency Contact Integration",
    "Monthly Health Reports",
    "Priority Support"
  ];

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "40px 20px"
    }}>
      <div style={{ 
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "40px"
      }}>
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ 
            fontSize: "2.5rem",
            color: "#2d3748",
            marginBottom: "16px",
            fontWeight: "700"
          }}>Get Access to VitalSync Pro</h1>
          <p style={{ 
            fontSize: "1.1rem",
            color: "#4a5568",
            maxWidth: "600px",
            margin: "0 auto"
          }}>Unlock Premium Features for Better Health Monitoring</p>
        </div>

        {/* Main Content Grid */}
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          margin: "0 auto",
          width: "100%",
          maxWidth: "900px"
        }}>
          {/* Features Section */}
          <div style={{ 
            background: "white",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}>
            <h2 style={{ 
              fontSize: "1.5rem",
              color: "#2d3748",
              marginBottom: "24px",
              fontWeight: "600"
            }}>Premium Features</h2>
            <ul style={{ 
              listStyle: "none",
              padding: 0,
              margin: 0,
              flex: 1
            }}>
              {features.map((feature, index) => (
                <li key={index} style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                  fontSize: "1.1rem",
                  color: "#4a5568"
                }}>
                  <i className="fas fa-check-circle" style={{ 
                    color: "#FF6B6B",
                    marginRight: "12px",
                    fontSize: "1.2rem"
                  }}></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Card */}
          <div style={{ 
            background: "white",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ 
                fontSize: "1.8rem",
                color: "#2d3748",
                marginBottom: "8px",
                fontWeight: "700"
              }}>Premium Access</h2>
              <div style={{ 
                fontSize: "2.5rem",
                color: "#FF6B6B",
                fontWeight: "700",
                marginBottom: "24px"
              }}>
                ₹250<span style={{ 
                  fontSize: "1rem",
                  color: "#718096"
                }}>/month</span>
              </div>
            </div>

            <button
              className="buy_btn"
              style={{ width: '100%', padding: 16, background: 'linear-gradient(90deg, #FF6B6B 60%, #FF8E8E 100%)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 20, cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,107,107,0.15)', transition: 'background 0.2s' }}
              onClick={async () => {
                // Wait for Razorpay script to be loaded
                function loadRazorpayScript() {
                  return new Promise((resolve) => {
                    if (window.Razorpay && typeof window.Razorpay === 'function') {
                      resolve(true);
                    } else {
                      const script = document.createElement('script');
                      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                      script.onload = () => resolve(true);
                      script.onerror = () => resolve(false);
                      document.body.appendChild(script);
                    }
                  });
                }
                const loaded = await loadRazorpayScript();
                if (!loaded) {
                  alert('Razorpay SDK failed to load. Please check your connection and refresh the page.');
                  return;
                }
                const res = await fetch("http://localhost:8080/api/payment/orders", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ amount: 250 })
                });
                const data = await res.json();
                const options = {
                  key: "rzp_test_E3WG9iWzRKq7C5", // Replace with your Razorpay key
                  amount: data.data.amount,
                  currency: data.data.currency,
                  name: "VitalSync Access",
                  description: "Access Fee Payment",
                  order_id: data.data.id,
                  handler: async function (response) {
                    const verifyRes = await fetch("http://localhost:8080/api/payment/verify", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(response)
                    });
                    const verifyData = await verifyRes.json();
                    alert(verifyData.message);
                  },
                  theme: { color: "#FF6B6B" },
                };
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
              }}
            >
              Pay & Access App
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          marginTop: "40px",
          maxWidth: "900px",
          margin: "40px auto 0"
        }}>
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "24px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <i className="fas fa-shield-alt" style={{
              fontSize: "2rem",
              color: "#FF6B6B",
              marginBottom: "16px"
            }}></i>
            <h3 style={{
              fontSize: "1.2rem",
              color: "#2d3748",
              marginBottom: "8px",
              fontWeight: "600"
            }}>Secure Payments</h3>
            <p style={{
              fontSize: "0.9rem",
              color: "#718096",
              margin: 0
            }}>Protected with industry-standard encryption</p>
          </div>

          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "24px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <i className="fas fa-undo" style={{
              fontSize: "2rem",
              color: "#FF6B6B",
              marginBottom: "16px"
            }}></i>
            <h3 style={{
              fontSize: "1.2rem",
              color: "#2d3748",
              marginBottom: "8px",
              fontWeight: "600"
            }}>30-Day Guarantee</h3>
            <p style={{
              fontSize: "0.9rem",
              color: "#718096",
              margin: 0
            }}>Try VitalSync risk-free with our money-back guarantee</p>
          </div>

          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "24px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <i className="fas fa-headset" style={{
              fontSize: "2rem",
              color: "#FF6B6B",
              marginBottom: "16px"
            }}></i>
            <h3 style={{
              fontSize: "1.2rem",
              color: "#2d3748",
              marginBottom: "8px",
              fontWeight: "600"
            }}>24/7 Support</h3>
            <p style={{
              fontSize: "0.9rem",
              color: "#718096",
              margin: 0
            }}>Our dedicated team is here to help you anytime</p>
          </div>
        </div>

        {/* Mobile Responsiveness */}
        <style>{`
          @media (max-width: 768px) {
            .main-content-grid {
              grid-template-columns: 1fr;
            }
            .trust-indicators {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Payment;
