import { Shield, Bell, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analysis", path: "/analysis" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">CyberShield</h1>
            <p className="text-xs text-muted-foreground">Smart Attack Detection</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/upload">
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload New File
            </Button>
          </Link>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/20 text-primary">A</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
