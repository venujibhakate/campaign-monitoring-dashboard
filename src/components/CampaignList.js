import { useEffect, useState } from "react";
import { getCampaigns, getCampaignInsights } from "../services/api";
import StatsCard from "./StatsCard";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCampaigns()
      .then(setCampaigns)
      .catch((err) => {
        console.error("Error fetching campaigns:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const selectCampaign = async (id) => {
    setSelectedCampaignId(id);
    setInsightsLoading(true);
    setSelected(null);
    try {
      const data = await getCampaignInsights(id);
      setSelected(data);
    } catch (err) {
      console.error("Error fetching campaign insights:", err);
      setError(err.message);
    } finally {
      setInsightsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#10b981";
      case "paused":
        return "#f59e0b";
      case "completed":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  if (loading) return <p>Loading campaigns...</p>;
  if (error && campaigns.length === 0) return <p className="error">Error: {error}</p>;

  return (
    <>
      <h2>Campaigns</h2>
      {error && <p className="error">Error: {error}</p>}

      <div className="campaigns-grid">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className={`campaign-card ${selectedCampaignId === c.id ? "selected" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => selectCampaign(c.id)}
          >
            <div className="campaign-header">
              <h4>{c.name}</h4>
              <span
                className="status-badge"
                style={{ backgroundColor: getStatusColor(c.status) }}
              >
                {c.status}
              </span>
            </div>
            <div className="campaign-details">
              <p><strong>Budget:</strong> ₹{c.budget?.toLocaleString()}</p>
              <p><strong>Daily Budget:</strong> ₹{c.daily_budget?.toLocaleString()}</p>
              <p><strong>Platforms:</strong> {c.platforms?.join(", ")}</p>
              <p><strong>Created:</strong> {new Date(c.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {insightsLoading && <p>Loading campaign insights...</p>}
      {selected && (
        <>
          <h3>Campaign Insights</h3>
          <div className="stats-grid">
            <StatsCard label="Impressions" value={selected.impressions?.toLocaleString()} />
            <StatsCard label="Clicks" value={selected.clicks?.toLocaleString()} />
            <StatsCard label="Conversions" value={selected.conversions?.toLocaleString()} />
            <StatsCard label="Spend" value={`₹${selected.spend?.toLocaleString()}`} />
            <StatsCard label="CTR" value={`${selected.ctr?.toFixed(2)}%`} />
            <StatsCard label="CPC" value={`₹${selected.cpc?.toFixed(2)}`} />
            <StatsCard label="Conversion Rate" value={`${selected.conversion_rate?.toFixed(2)}%`} />
          </div>
        </>
      )}
    </>
  );
}
