import { Shield, Upload, BarChart3, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-cyber opacity-30" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-card/30 backdrop-blur-sm border border-border rounded-full">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Smart India Hackathon 2025</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent ">
            CyberShield
          </h1>

          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Smart Attack Detection System
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            AI-powered system that detects and classifies cyber-attacks such as SQL Injection, XSS,
            Directory Traversal, and Web-Shell Upload directly from HTTP logs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-800 to-indigo-700  hover:bg-inherit transition-all duration-300 text-lg px-8 text-white"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Logs
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary text-lg px-8"
              onClick={() => navigate('/login')}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Dashboard
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <FileSearch className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">Automated Analysis</h3>
              <p className="text-sm text-muted-foreground">Processes logs automatically and extracts key patterns</p>
            </div>
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <Shield className="w-8 h-8 text-success mb-3 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">Real-Time Detection</h3>
              <p className="text-sm text-muted-foreground">Instant threat identification with 97-99% accuracy</p>
            </div>
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-accent mb-3 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">Visual Analytics</h3>
              <p className="text-sm text-muted-foreground">Interactive dashboards with exportable reports</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
