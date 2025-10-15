import { Shield, Database, Code, FileUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const attackTypes = [
  {
    name: "SQL Injection",
    percentage: "45.0%",
    color: "text-chart-1",
    icon: Database,
    description: "Database manipulation attacks through malicious SQL queries",
  },
  {
    name: "XSS",
    percentage: "23.0%",
    color: "text-chart-2",
    icon: Code,
    description: "Cross-site scripting vulnerabilities exploited",
  },
  {
    name: "DDoS",
    percentage: "14.0%",
    color: "text-chart-3",
    icon: Shield,
    description: "Distributed denial of service attack attempts",
  },
  {
    name: "Brute Force",
    percentage: "18.0%",
    color: "text-chart-4",
    icon: FileUp,
    description: "Password and authentication brute force attacks",
  },
];

const AttackTypes = () => {
  return (
    <section className="py-20 bg-slate-950/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Attack Type Classification
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Machine learning models identify and categorize threats with 97-99% accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {attackTypes.map((attack, index) => (
            <Card
              key={index}
              className="p-6 bg-card/70 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-muted/50 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <attack.icon className={`w-8 h-8 ${attack.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{attack.name}</h3>
                <p className={`text-3xl font-bold ${attack.color} mb-3`}>
                  {attack.percentage}
                </p>
                <p className="text-sm text-muted-foreground">{attack.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AttackTypes;
