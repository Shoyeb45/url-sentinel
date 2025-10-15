import { Code2, Database, Brain, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const techCategories = [
  {
    category: "Frontend",
    icon: Code2,
    color: "text-primary",
    bgColor: "bg-primary/10",
    technologies: ["React", "Next.js", "TailwindCSS", "Chart.js"],
  },
  {
    category: "Backend",
    icon: Database,
    color: "text-success",
    bgColor: "bg-success/10",
    technologies: ["Python", "FastAPI", "Express.js", "Node.js"],
  },
  {
    category: "AI/ML",
    icon: Brain,
    color: "text-accent",
    bgColor: "bg-accent/10",
    technologies: ["Random Forest", "SVM", "CNN/RNN", "TensorFlow", "scikit-learn"],
  },
  {
    category: "Database",
    icon: Shield,
    color: "text-warning",
    bgColor: "bg-warning/10",
    technologies: ["PostgreSQL", "Firebase", "IPFS"],
  },
];

const TechStack = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Technology Stack
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge technologies for maximum performance and accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {techCategories.map((category, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-lg ${category.bgColor} mb-4`}>
                <category.icon className={`w-6 h-6 ${category.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, techIndex) => (
                  <Badge
                    key={techIndex}
                    variant="secondary"
                    className="bg-muted/50 text-foreground border border-border"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Accuracy Stats */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-cyber border border-border">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Machine Learning Accuracy
              </h3>
              <div className="flex justify-center items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  97-99%
                </span>
              </div>
              <p className="text-muted-foreground">
                Achieved across multiple attack vectors using ensemble ML models
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
