export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">M</div>
          <h2>Mixo Ads</h2>
        </div>
        <p className="sidebar-subtitle">Campaign Dashboard</p>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="sidebar-info">
            <p className="info-label">Monitor & Analyze</p>
            <p className="info-text">Track your campaign performance in real-time</p>
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
        <p className="footer-text">Campaign Monitoring</p>
      </div>
    </div>
  );
}
