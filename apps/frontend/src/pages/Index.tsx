import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsOverview from "@/components/StatsOverview";
import AttackTypes from "@/components/AttackTypes";
import Features from "@/components/Features";
import WorkflowSteps from "@/components/WorkflowSteps";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Shield } from "lucide-react";

const activityData = [
  { time: "00:00", threats: 10 },
  { time: "04:00", threats: 7 },
  { time: "08:00", threats: 14 },
  { time: "12:00", threats: 23 },
  { time: "16:00", threats: 17 },
  { time: "20:00", threats: 30 },
];

const attackTypeData = [
  { name: "SQL Injection", value: 45, color: "#ef4444" },
  { name: "DDoS", value: 14, color: "#3b82f6" },
  { name: "Brute Force", value: 18, color: "#fbbf24" },
  { name: "XSS", value: 23, color: "#f97316" },
];
const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">
              Cyber Attack Analyzer
            </h1>
            <p className="text-xs text-muted-foreground">
              Security Log Analysis
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="flex h-10 items-center justify-center rounded-lg bg-primary/20 px-4 text-sm font-medium text-primary hover:bg-primary/30 transition-colors"
        >
          Login
        </button>
      </div>
      <Hero />
      <StatsOverview />

      {/* Dashboard Charts Section */}
      <section className="container px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real-Time Threat Intelligence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor security threats and analyze attack patterns in real-time
            with our advanced dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threat Activity Timeline */}
          <Card className="bg-card/50 backdrop-blur border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                Threat Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={activityData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis
                    dataKey="time"
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: "rgba(255,255,255,0.7)" }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: "rgba(255,255,255,0.7)" }}
                    label={{
                      value: "Threats Detected",
                      angle: -90,
                      position: "insideLeft",
                      fill: "rgba(255,255,255,0.7)",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="threats"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: "#ef4444", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Attack Type Distribution */}
          <Card className="bg-card/50 backdrop-blur border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="h-5 w-5 text-primary" />
                Attack Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attackTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {attackTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ color: "rgba(255,255,255,0.7)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      <AttackTypes />
      <Features />
      <WorkflowSteps />
      <TechStack />
      <Footer />
    </div>
  );
};

export default Index;
