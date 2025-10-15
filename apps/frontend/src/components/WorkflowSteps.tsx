import { Upload, Search, FileCheck, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Log Ingestion",
    description: "Upload your HTTP log files for processing and attack detection",
    icon: Upload,
    color: "text-primary",
  },
  {
    number: "02",
    title: "Detection Results",
    description: "AI models analyze patterns and classify threats with high accuracy",
    icon: Search,
    color: "text-success",
  },
  {
    number: "03",
    title: "Analysis",
    description: "View detailed breakdowns of detected attacks, IPs, and patterns",
    icon: FileCheck,
    color: "text-warning",
  },
  {
    number: "04",
    title: "Export & Summary",
    description: "Generate comprehensive reports for your security team",
    icon: Download,
    color: "text-accent",
  },
];

const WorkflowSteps = () => {
  return (
    <section className="py-20 bg-slate-950/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple four-step process from log upload to actionable insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2 z-0" />
              )}
              
              <Card className="relative z-10 p-6 bg-card/30 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-300 group">
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-4 text-6xl font-bold ${step.color} opacity-20`}>
                    {step.number}
                  </div>
                  <div className={`p-4 bg-muted/50 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSteps;
