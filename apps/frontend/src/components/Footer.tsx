import { Shield, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950/80 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-foreground">CyberShield</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered cyber attack detection system for Smart India Hackathon 2025
            </p>
          </div>

          {/* Team */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Team WanderWatch</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Problem Statement ID: SIH25229
            </p>
            <p className="text-sm text-muted-foreground">
              Theme: Blockchain and Cybersecurity
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors duration-300"
              >
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a
                href="#"
                className="p-2 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors duration-300"
              >
                <Mail className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 CyberShield - Team WanderWatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
