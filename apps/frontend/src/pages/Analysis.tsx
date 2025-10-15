import Header from "@/components/Header";
import URLSentinelDashboard from "@/components/URLSentinantal";

const Analysis = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="container p-6">
        <URLSentinelDashboard/>
      </main>
    </div>
  );
};

export default Analysis;
