import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Shield, Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import Header from "../components/Header";

const Dashboard = () => {
  const [analyzeStats, setAnalyzeStats] = useState({
    sqli: 0,
    xss: 0,
    directoryTraversal: 0,
    webShellUpload: 0,
    miscellaneous: 0
  });

  const [logStats, setLogStats] = useState({
    processed: 0,
    unprocessed: 0,
    total: 0
  });

  const [loading, setLoading] = useState(true);
  const API_BASE = 'http://localhost:8000/api/v1';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyzeRes, logRes] = await Promise.all([
          fetch(`${API_BASE}/http-log/analyze-stats`),
          fetch(`${API_BASE}/http-log/log-stats`)
        ]);

        if (analyzeRes.ok) {
          const analyzeData = await analyzeRes.json();
          if (analyzeData.success) {
            setAnalyzeStats(analyzeData.data);
          }
        }

        if (logRes.ok) {
          const logData = await logRes.json();
          if (logData.success) {
            setLogStats(logData.data);
          }
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const threatData = [
    { name: "SQL Injection", value: analyzeStats.sqli, color: "#ef4444" },
    { name: "XSS", value: analyzeStats.xss, color: "#f97316" },
    { name: "Directory Traversal", value: analyzeStats.directoryTraversal, color: "#fbbf24" },
    { name: "Web Shell Upload", value: analyzeStats.webShellUpload, color: "#8b5cf6" },
    { name: "Miscellaneous", value: analyzeStats.miscellaneous, color: "#6366f1" },
  ].filter(item => item.value > 0);

  const totalThreats = Object.values(analyzeStats).reduce((sum, val) => sum + val, 0);
  const processingRate = logStats.total > 0 ? ((logStats.processed / logStats.total) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-slate-950 ">
      <Header />
      <main className="container p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Security Dashboard</h2>
          <p className="text-slate-400">Real-time HTTP log analysis and threat monitoring</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Threats</p>
                  <p className="text-3xl font-bold text-red-500 mt-2">{totalThreats}</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-red-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Processed Logs</p>
                  <p className="text-3xl font-bold text-green-500 mt-2">{logStats.processed}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Pending Logs</p>
                  <p className="text-3xl font-bold text-yellow-500 mt-2">{logStats.unprocessed}</p>
                </div>
                <Clock className="h-10 w-10 text-yellow-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Processing Rate</p>
                  <p className="text-3xl font-bold text-blue-500 mt-2">{processingRate}%</p>
                </div>
                <Activity className="h-10 w-10 text-blue-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threat Distribution Chart */}
          <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-red-500" />
                Threat Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-80">
                  <p className="text-slate-400">Loading data...</p>
                </div>
              ) : threatData.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={threatData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {threatData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-80">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <p className="text-slate-300 font-medium">No threats detected</p>
                    <p className="text-slate-500 text-sm mt-1">System is secure</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Threat Details Breakdown */}
          <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Activity className="h-5 w-5 text-blue-500" />
                Threat Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "SQL Injection", value: analyzeStats.sqli, color: "bg-red-500" },
                  { label: "Cross-Site Scripting (XSS)", value: analyzeStats.xss, color: "bg-orange-500" },
                  { label: "Directory Traversal", value: analyzeStats.directoryTraversal, color: "bg-yellow-500" },
                  { label: "Web Shell Upload", value: analyzeStats.webShellUpload, color: "bg-purple-500" },
                  { label: "Miscellaneous Threats", value: analyzeStats.miscellaneous, color: "bg-indigo-500" },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-300">{item.label}</span>
                      <span className="text-sm font-bold text-white">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: totalThreats > 0 ? `${(item.value / totalThreats) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-400">Log Processing Status</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Total Logs</span>
                    <span className="font-bold text-white">{logStats.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Processed</span>
                    <span className="font-bold text-green-400">{logStats.processed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-400">Pending</span>
                    <span className="font-bold text-yellow-400">{logStats.unprocessed}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;