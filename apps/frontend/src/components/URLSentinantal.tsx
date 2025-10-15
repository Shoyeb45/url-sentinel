import { useState, useEffect } from 'react';
import { RefreshCw, Search, AlertCircle, CheckSquare, Square } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster, toast } from 'sonner';

const URLSentinelDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterThreat, setFilterThreat] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  const API_BASE = 'http://localhost:8000/api/v1';

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/http-log/`);
      if (!response.ok) throw new Error('Failed to fetch logs');
      const data = await response.json();
      if (data.success) {
        setLogs(data.data || []);
        toast.success('Logs fetched successfully');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to fetch logs');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const analyzeLogs = async () => {
    if (selectedLogs.length === 0) {
      toast.error('Please select at least one log to analyze');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/http-log/analyse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logIds: selectedLogs })
      });

      if (!response.ok) throw new Error('Failed to analyze logs');
      const data = await response.json();

      if (data.success) {
        toast.success(`Successfully analyzed ${selectedLogs.length} log(s)`);
        setSelectedLogs([]);
        await fetchLogs();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to analyze logs');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const unanalyzedLogs = logs.filter(log => !log.logAnalysis);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = !searchTerm ||
      log.srcIp?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.uri?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.host?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userAgent?.toLowerCase().includes(searchTerm.toLowerCase());

    const logStatus = log.logAnalysis ? 'Analyzed' : 'Not Analyzed';
    const matchesStatus = filterStatus === 'all' || logStatus === filterStatus;

    const attackType = log.logAnalysis?.attackType || 'None';
    const matchesThreat = filterThreat === 'all' || attackType === filterThreat;

    const matchesMethod = filterMethod === 'all' || log.method === filterMethod;

    return matchesSearch && matchesStatus && matchesThreat && matchesMethod;
  });

  const handleSelectLog = (logId) => {
    setSelectedLogs(prev => {
      if (prev.includes(logId)) {
        return prev.filter(id => id !== logId);
      } else {
        return [...prev, logId];
      }
    });
  };

  const handleSelectAllUnanalyzed = () => {
    const visibleUnanalyzed = filteredLogs.filter(log => !log.logAnalysis).map(log => log.id);
    if (selectedLogs.length === visibleUnanalyzed.length && visibleUnanalyzed.length > 0) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(visibleUnanalyzed);
    }
  };

  const getThreatBadge = (logAnalysis) => {
    if (!logAnalysis || !logAnalysis.attackType) {
      return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Safe</Badge>;
    }

    const conf = (logAnalysis.confidenceScore * 100) || 0;
    const attackType = logAnalysis.attackType;

    if (conf > 80) {
      return <Badge variant="destructive">{attackType}</Badge>;
    } else if (conf > 50) {
      return <Badge className="bg-orange-500 hover:bg-orange-600">{attackType}</Badge>;
    } else {
      return <Badge variant="secondary">{attackType}</Badge>;
    }
  };

  const getStatusBadge = (logAnalysis) => {
    if (logAnalysis) {
      return <Badge className="bg-green-500 hover:bg-green-600">Analyzed</Badge>;
    } else {
      return <Badge variant="secondary">Not Analyzed</Badge>;
    }
  };

  const getMethodBadge = (method) => {
    const colors = {
      'GET': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      'POST': 'bg-green-500/10 text-green-500 border-green-500/20',
      'PUT': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'DELETE': 'bg-red-500/10 text-red-500 border-red-500/20',
      'PATCH': 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    };
    return <Badge variant="outline" className={`font-mono ${colors[method] || ''}`}>{method || 'N/A'}</Badge>;
  };

  const uniqueMethods = [...new Set(logs.map(log => log.method).filter(Boolean))];
  const uniqueThreats = [...new Set(logs.map(log => log.logAnalysis?.attackType).filter(Boolean))];

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-white p-6 rounded-md">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">URL Sentinel - Security Logs</h1>
              <p className="text-slate-400 mt-1">Real-time HTTP log monitoring and threat analysis</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchLogs} variant="outline" size="sm" disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={analyzeLogs}
                variant="default"
                size="sm"
                disabled={loading || selectedLogs.length === 0}
              >
                Analyze Selected ({selectedLogs.length})
              </Button>
            </div>
          </div>

          {unanalyzedLogs.length > 0 && (
            <Alert className="bg-blue-500/10 border-blue-500/20">
              <AlertCircle className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-300">
                {unanalyzedLogs.length} log(s) pending analysis. Select logs and click "Analyze Selected" to process them.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search IP, URI, Host, User Agent..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterMethod} onValueChange={setFilterMethod}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    {uniqueMethods.map(method => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Analyzed">Analyzed</SelectItem>
                    <SelectItem value="Not Analyzed">Not Analyzed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterThreat} onValueChange={setFilterThreat}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Threat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Threats</SelectItem>
                    {uniqueThreats.map(threat => (
                      <SelectItem key={threat} value={threat}>{threat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Security Logs</CardTitle>
                  <CardDescription className="mt-1">
                    Showing {filteredLogs.length} of {logs.length} total logs
                  </CardDescription>
                </div>
                {unanalyzedLogs.length > 0 && (
                  <Button
                    onClick={handleSelectAllUnanalyzed}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {selectedLogs.length > 0 && filteredLogs.filter(log => !log.logAnalysis).every(log => selectedLogs.includes(log.id)) ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                    Select All Unanalyzed
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-800">
                      <th className="text-left px-4 py-3 font-semibold text-slate-200 text-sm whitespace-nowrap w-12">
                        Select
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-200 text-sm whitespace-nowrap">Timestamp</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-200 text-sm whitespace-nowrap">Source IP</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-200 text-sm whitespace-nowrap">Host</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-200 text-sm whitespace-nowrap">URI Path</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-200 text-sm whitespace-nowrap">Method</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-200 text-sm whitespace-nowrap">User Agent</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-200 text-sm whitespace-nowrap">Status</th>                      <th className="text-left px-4 py-3 font-semibold text-slate-200 text-sm whitespace-nowrap">Attack Type</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-200 text-sm whitespace-nowrap">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {loading ? (
                      <tr>
                        <td colSpan={10} className="text-center py-16 text-slate-400 bg-slate-900/20">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                          <div className="text-sm">Loading logs...</div>
                        </td>
                      </tr>
                    ) : filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="text-center py-16 text-slate-400 bg-slate-900/20">
                          <div className="text-sm">{logs.length === 0 ? 'No logs available. Upload logs to get started.' : 'No logs match your filters.'}</div>
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map((log, idx) => (
                        <tr
                          key={log.id || idx}
                          className={`
                            ${idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-900/50'}
                            hover:bg-slate-800/50 transition-all duration-150
                          `}
                        >
                          <td className="p-1">
                            {!log.logAnalysis && (
                              <Checkbox
                                checked={selectedLogs.includes(log.id)}
                                onCheckedChange={() => handleSelectLog(log.id)}
                              />
                            )}
                          </td>
                          <td className="px-4 py-4 font-mono text-xs text-slate-300 whitespace-nowrap">
                            {log.timestamp || 'N/A'}
                          </td>
                          <td className="px-4 py-4 font-mono text-sm font-semibold text-blue-400 whitespace-nowrap">
                            {log.srcIp || 'N/A'}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-300 max-w-[180px] truncate">
                            <div className="truncate" title={log.host}>
                              {log.host || 'N/A'}
                            </div>
                          </td>
                          <td className="px-4 py-4 font-mono text-xs text-slate-400 max-w-[300px]">
                            <div className="truncate" title={log.uri}>
                              {log.uri || 'N/A'}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {getMethodBadge(log.method)}
                          </td>
                          <td className="px-4 py-4 text-xs text-slate-400 max-w-[250px]">
                            <div className="truncate" title={log.userAgent}>
                              {log.userAgent || 'N/A'}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {getStatusBadge(log.logAnalysis)}
                          </td>
                          <td className="px-4 py-4">
                            {getThreatBadge(log.logAnalysis)}
                          </td>
                          <td className="px-4 py-4">
                            {log.logAnalysis?.confidenceScore ? (
                              <div className="flex items-center gap-3 min-w-[140px]">
                                <div className="flex-1 bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ${log.logAnalysis.confidenceScore * 100 > 80
                                        ? 'bg-gradient-to-r from-red-500 to-red-600'
                                        : log.logAnalysis.confidenceScore * 100 > 50
                                          ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                                          : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                                      }`}
                                    style={{ width: `${log.logAnalysis.confidenceScore * 100}%` }}
                                  />
                                </div>
                                <span className="text-xs font-semibold text-slate-300 min-w-[45px]">
                                  {(log.logAnalysis.confidenceScore * 100).toFixed(1)}%
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-500 text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default URLSentinelDashboard;