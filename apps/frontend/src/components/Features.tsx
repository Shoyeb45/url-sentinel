import { Upload, Search, Download, TrendingUp, Lock, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Upload,
    title: "Log Ingestion",
    description: "Upload HTTP logs for instant attack detection and analysis",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Search,
    title: "Advanced Filtering",
    description: "Search and filter logs by IP, URL, time range, and threat level",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Live threat detection with ML models achieving 97-99% accuracy",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Download,
    title: "Export Reports",
    description: "Generate comprehensive reports with detected threats and statistics",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Lock,
    title: "Threat Intelligence",
    description: "Identify malicious IPs and classify attack patterns automatically",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description: "Get notified immediately when critical threats are detected",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-slate-950/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Powerful Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to detect, analyze, and respond to cyber threats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-lg"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
