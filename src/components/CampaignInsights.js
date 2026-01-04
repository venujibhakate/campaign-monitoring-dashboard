import { useEffect, useState } from "react";
import { getOverallInsights } from "../services/api";
import StatsCard from "./StatsCard";

export default function CampaignInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getOverallInsights()
      .then(setData)
      .catch((err) => {
        console.error("Error fetching insights:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading insights...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!data) return null;

  return (
    <>
      <h2>Overall Campaign Performance</h2>
      <div className="stats-grid">
        <StatsCard label="Total Campaigns" value={data.total_campaigns} />
        <StatsCard label="Active" value={data.active_campaigns} />
        <StatsCard label="Paused" value={data.paused_campaigns} />
        <StatsCard label="Completed" value={data.completed_campaigns} />
        <StatsCard label="Total Impressions" value={data.total_impressions?.toLocaleString()} />
        <StatsCard label="Total Clicks" value={data.total_clicks?.toLocaleString()} />
        <StatsCard label="Total Conversions" value={data.total_conversions?.toLocaleString()} />
        <StatsCard label="Total Spend" value={`₹${data.total_spend?.toLocaleString()}`} />
        <StatsCard label="Avg CTR" value={`${data.avg_ctr?.toFixed(2)}%`} />
        <StatsCard label="Avg CPC" value={`₹${data.avg_cpc?.toFixed(2)}`} />
        <StatsCard label="Avg Conversion Rate" value={`${data.avg_conversion_rate?.toFixed(2)}%`} />
      </div>
    </>
  );
}
