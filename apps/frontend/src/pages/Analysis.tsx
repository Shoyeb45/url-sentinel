import Header from "@/components/Header";
import URLSentinelDashboard from "@/components/URLSentinantal";

const Analysis = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-6 py-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Analysis</h2>
        <p className="text-muted-foreground">Detailed threat analysis coming soon...</p>
        <URLSentinelDashboard/>
      </main>
    </div>
  );
};

export default Analysis;
