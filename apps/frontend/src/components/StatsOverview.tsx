import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    title: "Total Logs",
    value: "2,847",
    subtitle: "Uploaded today",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    title: "Processed",
    value: "1,923",
    subtitle: "67% of total",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
  },
  {
    title: "Unprocessed",
    value: "924",
    subtitle: "Awaiting analysis",
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
  },
  {
    title: "Threats Detected",
    value: "147",
    subtitle: "Require attention",
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
  },
];

const StatsOverview = () => {
  return (
    <section className="py-20 bg-slate-950/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Real-Time Security Overview
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor your security landscape with live statistics and threat intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`p-6 border-2 ${stat.borderColor} bg-card/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsOverview;
