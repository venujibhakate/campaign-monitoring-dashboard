// Utility functions for formatting numbers and data

export const formatNumber = (num) => {
  if (num === null || num === undefined) return "0";
  return new Intl.NumberFormat("en-IN").format(num);
};

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "₹0";
  return `₹${formatNumber(Math.round(amount))}`;
};

export const formatPercentage = (value, decimals = 2) => {
  if (value === null || value === undefined) return "0%";
  return `${Number(value).toFixed(decimals)}%`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    return dateString;
  }
};

export const getStatusColor = (status) => {
  const colors = {
    active: "#10b981",
    paused: "#f59e0b",
    completed: "#6b7280",
  };
  return colors[status] || "#6b7280";
};

export const getPlatformLabel = (platform) => {
  const labels = {
    meta: "Meta",
    google: "Google",
    linkedin: "LinkedIn",
    other: "Other",
  };
  return labels[platform] || platform;
};

