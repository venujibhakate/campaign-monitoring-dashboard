import "./styles/dashboard.css";
import Layout from "./components/layout/Layout";
import CampaignInsights from "./components/CampaignInsights";
import CampaignList from "./components/CampaignList";

function App() {
  return (
    <Layout>
      <CampaignInsights />
      <CampaignList />
    </Layout>
  );
}

export default App;
