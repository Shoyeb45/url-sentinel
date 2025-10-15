import Header from "@/components/Header";
import URLSentinelDashboard from "@/components/URLSentinantal";

const Analysis = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6 ">
        <URLSentinelDashboard/>
      </main>
    </div>
  );
};

export default Analysis;
