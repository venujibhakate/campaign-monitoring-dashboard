const BASE_URL = "https://mixo-fe-backend-task.vercel.app";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const getCampaigns = async () => {
  try {
    const res = await fetch(`${BASE_URL}/campaigns`);
    const data = await handleResponse(res);
    return data.campaigns || [];
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
};

export const getOverallInsights = async () => {
  try {
    const res = await fetch(`${BASE_URL}/campaigns/insights`);
    const data = await handleResponse(res);
    return data.insights || {};
  } catch (error) {
    console.error("Error fetching overall insights:", error);
    throw error;
  }
};

export const getCampaignInsights = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/campaigns/${id}/insights`);
    const data = await handleResponse(res);
    return data.insights || {};
  } catch (error) {
    console.error(`Error fetching insights for campaign ${id}:`, error);
    throw error;
  }
};
